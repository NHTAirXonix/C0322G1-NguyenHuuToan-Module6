import {Component, OnInit} from '@angular/core';
import {Pigsty} from '../../model/pigsty';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {PigstyService} from '../../service/pigsty.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {TokenStorageService} from '../../service/token-storage.service';
import {Employee} from '../../model/employee';
import {ShareService} from '../../service/share.service';
import {EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-pigsty-create',
  templateUrl: './pigsty-create.component.html',
  styleUrls: ['./pigsty-create.component.css']
})
export class PigstyCreateComponent implements OnInit {
  pigsty: Pigsty;
  now = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  formPigsty = new FormGroup({
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
              private title: Title,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private employeeService: EmployeeService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
    this.title.setTitle('Tạo chuồng nuôi');
  }

  ngOnInit(): void {
    this.loadHeader();
    this.pigstyService.getAllPigsty().subscribe(value => {
      this.pigstys = value;
      this.employeeService.finByUser(this.username).subscribe(employee => {
        this.employee = employee;
        this.getForm();
      });
    });
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  getForm() {
    this.formPigsty = new FormGroup({
      buildDate: new FormControl(),
      code: new FormControl('', [Validators.required, Validators.pattern('^C\\d{3}$')]),
      creationDate: new FormControl(this.now, [Validators.required]),
      maxNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(20)]),
      typePigs: new FormControl('', [Validators.required]),
    }, this.checkDate);
  }

  createPigsty() {
    console.log(this.formPigsty);
    if (this.formPigsty.valid) {
      const pigstyCreate: Pigsty = this.formPigsty.value;
      pigstyCreate.employee = {
        id: this.employee.id
      };
      this.pigstyService.createPigsty(pigstyCreate).subscribe(data => {
        }, error => {
        },
        () => {
          this.router.navigateByUrl('/pigsty/list').then(next => this.toastrService.success('Thêm mới thành công'));
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
