import { Component, OnInit } from '@angular/core';
import {ExportService} from '../../service/export.service';
import {EmployeeService} from '../../service/employee.service';
import {PigstyService} from '../../service/pigsty.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Pigsty} from '../../model/pigsty';
import {Employee} from '../../model/employee';
import {Export} from '../../model/export';

@Component({
  selector: 'app-export-update',
  templateUrl: './export-update.component.html',
  styleUrls: ['./export-update.component.css']
})
export class ExportUpdateComponent implements OnInit {

  constructor(private exportService: ExportService,
              private employeeService: EmployeeService,
              private pigstyService: PigstyService,
              private toast: ToastrService, private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  exportForm: FormGroup = new FormGroup({
    codeExport: new FormControl(),
    company: new FormControl(),
    amount: new FormControl(),
    kilogram: new FormControl(),
    saleDate: new FormControl(),
    price: new FormControl(),
    totalMoney: new FormControl(),
    typePigs: new FormControl(),
    isDeleted: new FormControl(),
    pigsty: new FormControl(),
    employee: new FormControl()
  });
  pigstyList: Pigsty[];
  employeeList: Employee[];
  id: number;
  type = '';
  total = 0;

  ngOnInit(): void {
    this.employeeService.getAllEmployee().subscribe(value => {
      this.employeeList = value;
      this.pigstyService.getAllPigsty().subscribe(pigsty => {
        this.pigstyList = pigsty;
        this.activatedRoute.paramMap.subscribe(param => {
          this.id = +param.get('id');
          this.exportService.findById(this.id).subscribe(next => {
            this.exportForm.patchValue(next);
            this.exportForm.patchValue({employee: next.employee.id});
            this.exportForm.patchValue({pigsty: next.pigsty.id});
            this.changTypePigs();
            this.exportForm.patchValue({kilogram: next.kilogram});
            this.exportForm.patchValue({price: next.price});
            this.changEmployeeName(this.exportForm.value.employee);
            console.log(this.exportForm.value);
            this.getTotal();
            console.log(this.exportForm.value);
          });
        });
      });

    });
    this.exportForm = new FormGroup({
      codeExport: new FormControl('', [Validators.required, Validators.pattern('^(MC-)+([0-9]{2})$')]),
      company: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      amount: new FormControl('', [Validators.required]),
      employeeName: new FormControl('', [Validators.required]),
      kilogram: new FormControl('', [Validators.required,  Validators.min(0)]),
      saleDate: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required,  Validators.min(0)]),
      total: new FormControl('', [Validators.required,  Validators.min(0)]),
      typePigs: new FormControl('', [Validators.required]),
      pigsty: new FormControl('', [Validators.required]),
      employee: new FormControl('', [Validators.required])
    });
  }

  getPigsty(value) {
    this.exportService.getTotalWeightCount(value).subscribe(next => {
      this.exportForm.patchValue(this.exportForm.value);
      this.exportForm.patchValue({amount: next[0]});
      this.exportForm.patchValue({kilogram: next[1]});
      this.getTotal();
    });
  }

  changEmployeeName(value) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.employeeList.length; i++) {
      if (+this.exportForm.value.employee === this.employeeList[i].id) {
        this.exportForm.patchValue({employeeName: this.employeeList[i].name});
      }
    }
  }

  changTypePigs() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.pigstyList.length; i++) {
      if (+this.exportForm.value.pigsty === this.pigstyList[i].id) {
        if (this.pigstyList[i].typePigs === 0) {
          this.exportForm.patchValue({typePigs: 'Lợn thịt'});
        } else {
          this.exportForm.patchValue({typePigs: 'Lợn giống'});
        }
      }
    }
  }

  getTotal() {
    this.exportForm.patchValue({total: (+this.exportForm.value.price) * (+this.exportForm.value.kilogram)});
    this.total = (+this.exportForm.value.price) * (+this.exportForm.value.kilogram);
  }

  update() {
    const exports: Export = this.exportForm.value;
    if (this.exportForm.value.typePigs === 'Lợn thit') {
      exports.typePigs = 0;
    } else {
      exports.typePigs = 1;
    }

    exports.pigstyDto = {
      id: +this.exportForm.value.pigsty
    };
    exports.employDto = {
      id: +this.exportForm.value.employee
    };
    this.exportService.updateExport(this.id, exports).subscribe(value => {
      this.toast.success('Chỉnh sửa thành công', 'Thông báo');
      this.exportForm.reset();
      this.router.navigateByUrl('/export/page');
    }, error => {
      this.toast.success('Xảy ra lỗi', 'Thông báo');
    });
  }

  reset() {
    this.ngOnInit();
  }
}
