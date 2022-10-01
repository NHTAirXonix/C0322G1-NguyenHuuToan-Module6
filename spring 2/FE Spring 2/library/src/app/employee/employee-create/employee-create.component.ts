import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {checkBirthDay, checkDay} from '../../validated/check-birth-day';
import {Employee} from '../../model/employee';
import {Title} from '@angular/platform-browser';
import {EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  selectedImage: File = null;
  checkImgSize = false;
  regexImageUrl = false;
  editImageState = false;
  checkImg: boolean;
  url: any;
  msg = '';
  loader = true;
  isExitsCode = false;
  isExitsIdCard = false;
  isExitsUsername = false;
  isExitsEmail = false;

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^(NV-)+([0-9]{3})$')]),
    name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$')]),
    username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
    creationDate: new FormControl(''),
    birthDay: new FormControl('', [Validators.required, checkBirthDay, checkDay]),
    gender: new FormControl('', [Validators.required]),
    idCard: new FormControl('', [Validators.required, Validators.pattern('^\\d{12}$')]),
    image: new FormControl('')
  });

  constructor(private employeeService: EmployeeService,
              private toast: ToastrService,
              private router: Router,
              private storage: AngularFireStorage,
              private title: Title) {
    this.title.setTitle('Thêm mới nhân viên');
  }

  ngOnInit(): void {
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  reset() {
    this.employeeForm.reset();
    this.selectedImage = null;
    this.checkImgSize = false;
    this.regexImageUrl = false;
    this.editImageState = false;
    this.checkImg = false;
  }

  submitImage() {
    this.loader = false;
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const filePath = `employee/${nameImg}`;
    const fileRef = this.storage.ref(filePath);
    let employee: Employee;
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.employeeForm.patchValue({image: url});
          console.log(url);
          employee = {
            code: this.employeeForm.value.code,
            name: this.employeeForm.value.name,
            userDto: {
              username: this.employeeForm.value.username,
              password: this.employeeForm.value.password,
              email: this.employeeForm.value.email,
            },
            birthDay: this.employeeForm.value.birthDay,
            gender: this.employeeForm.value.gender,
            idCard: this.employeeForm.value.idCard,
            image: this.employeeForm.value.image
          };
          this.employeeService.saveEmployee(employee).subscribe(() => {
            this.router.navigate(['/employee']);
            this.toast.success('Thêm mới nhân viên thành công.', 'Thông báo');
          }, error => {
            this.toast.error('Thêm mới nhân viên thất bại.', 'Thông báo');
            console.log(error);
          });
        });
      })
    ).subscribe();
  }

  checkCode($event: Event) {
    this.employeeService.checkCode(String($event)).subscribe(value => {
        if (value) {
          this.isExitsCode = true;
        } else {
          this.isExitsCode = false;
        }
      }
    );
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

  checkUsername($event: Event) {
    this.employeeService.checkUsername(String($event)).subscribe(value => {
        if (value) {
          this.isExitsUsername = true;
        } else {
          this.isExitsUsername = false;
        }
      }
    );
  }

  checkEmail($event: Event) {
    this.employeeService.checkEmail(String($event)).subscribe(value => {
        if (value) {
          this.isExitsEmail = true;
        } else {
          this.isExitsEmail = false;
        }
      }
    );
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
}
