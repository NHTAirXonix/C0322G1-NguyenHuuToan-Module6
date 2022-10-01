import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Pigsty} from '../../model/pigsty';
import {PigstyService} from '../../service/pigsty.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import {Employee} from '../../model/employee';
import {TokenStorageService} from '../../service/token-storage.service';
import {EmployeeService} from '../../service/employee.service';
import {ShareService} from '../../service/share.service';


@Component({
  selector: 'app-pigsty-edit',
  templateUrl: './pigsty-edit.component.html',
  styleUrls: ['./pigsty-edit.component.css']
})
export class PigstyEditComponent implements OnInit {

  pigsty: Pigsty = {};
  now = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  getFormEdit = new FormGroup({
    buildDate: new FormControl(),
    code: new FormControl(),
    creationDate: new FormControl(),
    maxNumber: new FormControl(),
    typePigs: new FormControl(),
    employee: new FormControl(),
  });
  isExitsCode = 'true';
  username: string;
  employee: Employee = {};
  pigstys: Pigsty[];

  constructor(private pigstyService: PigstyService,
              private toastrService: ToastrService,
              private router: Router,
              private datePipe: DatePipe,
              private title: Title, private tokenStorageService: TokenStorageService,
              private shareService: ShareService, private employeeService: EmployeeService, private activatedRoute: ActivatedRoute) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
    this.title.setTitle('Tạo chuồng nuôi');
  }

  ngOnInit(): void {
    // document.getElementById('creationDate').click();
    this.loadHeader();
    this.pigstyService.getAllPigsty().subscribe(value => {
      this.pigstys = value;
      this.employeeService.finByUser(this.username).subscribe(employee => {
        this.employee = employee;
        this.getParamId();
      });
    });
  }

  getParamId() {
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.pigstyService.getPigsty(+id).subscribe(data => {
        if (data == null) {
          this.toastrService.error('Thao tác của bạn không đúng nên đã quay lại danh sách chuồng.', 'Thông Báo');
          this.router.navigateByUrl('/pigsty/list').then();
        }
        this.pigsty = data;
        this.getForm(this.pigsty);
      });
    });
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  getForm(pigsty: Pigsty) {
    this.getFormEdit = new FormGroup({
      buildDate: new FormControl(pigsty.buildDate),
      code: new FormControl(pigsty.code, [Validators.required, Validators.pattern('^C\\d{3}$')]),
      creationDate: new FormControl(pigsty.creationDate, [Validators.required]),
      maxNumber: new FormControl(pigsty.maxNumber, [Validators.required, Validators.min(1), Validators.max(20)]),
      typePigs: new FormControl(pigsty.typePigs, [Validators.required]),
    }, this.checkDate);
  }

  editPigsty() {
    if (this.getFormEdit.valid) {
      const pigstyEdit: Pigsty = this.getFormEdit.value;
      pigstyEdit.id = this.pigsty.id;
      pigstyEdit.code = this.pigsty.code;
      pigstyEdit.employee = {
        id: this.employee.id
      };
      this.pigstyService.editPigsty(pigstyEdit).subscribe(data => {
        }, error => {
        },
        () => {
          this.router.navigateByUrl('/pigsty/list').then(next => this.toastrService.success('Chỉnh sửa thành công'));
        });
    }
  }

  checkCode(even: string) {
    for (const pigsty of this.pigstys) {
      if (pigsty.code === even) {
        this.isExitsCode = 'false';
        return;
      }
    }
    this.isExitsCode = 'true';
  }

  private checkDate(form: AbstractControl) {
    if (form.value.buildDate === null) {
      return null;
    }
    const startDate = new Date(form.value.creationDate);
    const endDate = new Date(form.value.buildDate);
    if (endDate.getTime() - startDate.getTime() < 0) {
      return {dateError: true};
    }
  }
}
