import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {checkBirthDay, checkDay} from '../../validated/check-birth-day';
import {Title} from '@angular/platform-browser';
import {EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    birthDay: new FormControl(''),
    gender: new FormControl(''),
    idCard: new FormControl(''),
    image: new FormControl('')
  });

  id: number;
  selectedImage: File = null;
  checkImgSize = false;
  regexImageUrl = false;
  editImageState = false;
  checkImg: boolean;
  url: any;
  msg = '';
  loader = true;
  isExitsIdCard = false;

  constructor(private employeeService: EmployeeService,
              private toast: ToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private storage: AngularFireStorage,
              private title: Title) {
    this.title.setTitle('Chỉnh sửa nhân viên');
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.employeeService.findById(this.id).subscribe(employee => {
        this.employeeForm = new FormGroup({
          id: new FormControl(employee.id),
          code: new FormControl(employee.code, Validators.required),
          name: new FormControl(employee.name, [Validators.required, Validators.maxLength(30), Validators.pattern('^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$')]),
          birthDay: new FormControl(employee.birthDay, [Validators.required, checkBirthDay, checkDay]),
          gender: new FormControl(employee.gender, [Validators.required]),
          idCard: new FormControl(employee.idCard, [Validators.required, Validators.pattern('^\\d{12}$')]),
          image: new FormControl(employee.image)
        });
      });
    });
  }

  ngOnInit(): void {
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  editEmployee() {
    this.loader = false;
    const nameImg = this.getCurrentDateTime() + this.selectedImage?.name;
    const filePath = `employee/${nameImg}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.employeeForm.patchValue({image: url});
          this.employeeService.editEmployee(this.id, this.employeeForm.value).subscribe(() => {
            this.router.navigate(['/employee']);
            this.toast.success('Sửa thông tin nhân viên thành công.', 'Thông báo');
          }, error => {
            this.toast.error('Sửa thông tin nhân viên thất bại.', 'Thông báo');
            console.log(error);
          });
        });
      })
    ).subscribe();
  }

  onFileSelected(event) {
    this.regexImageUrl = false;
    if (event.target.files[0].size > 9000000) {
      return;
    }
    this.selectedImage = event.target.files[0];
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      this.regexImageUrl = true;
      return;
    }
    this.employeeForm.patchValue({imageUrl: this.selectedImage.name});
  }

  checkIdCard($event: Event) {
    this.employeeService.checkIdCard(String($event)).subscribe(idCard => {
        if (idCard) {
          this.isExitsIdCard = true;
        } else {
          this.isExitsIdCard = false;
        }
      }
    );
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    if (event.target.files[0].size > 9000000) {
      return;
    }
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      return;
    }
    this.checkImgSize = false;
    this.checkImg = false;
    this.editImageState = true;

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Chỉ có file ảnh được hỗ trợ';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  reset(id: number) {
    this.selectedImage = null;
    this.checkImgSize = false;
    this.regexImageUrl = false;
    this.editImageState = false;
    this.checkImg = false;
    this.employeeService.findById(id).subscribe(employee => {
      this.employeeForm = new FormGroup({
        id: new FormControl(employee.id),
        code: new FormControl(employee.code),
        name: new FormControl(employee.name),
        birthDay: new FormControl(employee.birthDay),
        gender: new FormControl(employee.gender),
        idCard: new FormControl(employee.idCard),
        image: new FormControl(employee.image)
      });
    });
  }
}
