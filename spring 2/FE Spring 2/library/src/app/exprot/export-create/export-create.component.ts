import { Component, OnInit } from '@angular/core';
import {ExportService} from '../../service/export.service';
import {EmployeeService} from '../../service/employee.service';
import {PigstyService} from '../../service/pigsty.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Pigsty} from '../../model/pigsty';
import {Employee} from '../../model/employee';
import {Export} from '../../model/export';

@Component({
  selector: 'app-export-create',
  templateUrl: './export-create.component.html',
  styleUrls: ['./export-create.component.css']
})
export class ExportCreateComponent implements OnInit {

  constructor(private exportService: ExportService,
              private employeeService: EmployeeService,
              private pigstyService: PigstyService,
              private toast: ToastrService,
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
  total = 0;
  isExitsCode = false;
  type = '';

  ngOnInit(): void {
    this.employeeService.getAllEmployee().subscribe(value => {
      this.employeeList = value;
    });
    this.pigstyService.getAllPigsty().subscribe(value => {
      this.pigstyList = value;
    });
    this.exportForm = new FormGroup({
      codeExport: new FormControl('', [Validators.required, Validators.pattern('^(MC-)+([0-9]{2})$')]),
      company: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      amount: new FormControl('', [Validators.required]),
      employeeName: new FormControl('', [Validators.required]),
      kilogram: new FormControl('', [Validators.required, Validators.min(0)]),
      saleDate: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      total: new FormControl('', [Validators.required, Validators.min(0)]),
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

  getTotalMoney() {
    this.total = this.exportService.getTotal(this.exportForm.value.kilogram, this.exportForm.value.price);
  }

  changEmployeeName(value) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.employeeList.length; i++) {
      if (this.exportForm.value.employee === '' + this.employeeList[i].id) {
        this.exportForm.patchValue({employeeName: this.employeeList[i].name});
        console.log(this.exportForm.value);
      }
    }
  }

  changTypePigs(value: any) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.pigstyList.length; i++) {
      if (this.exportForm.value.pigsty === '' + this.pigstyList[i].id) {
        if (this.pigstyList[i].typePigs === 0) {
          this.exportForm.patchValue({typePigs: 'L???n th???t'});
        } else {
          this.exportForm.patchValue({typePigs: 'L???n gi???ng'});
        }
      }
    }
  }

  getTotal() {
    this.exportForm.patchValue({total: (+this.exportForm.value.price) * (+this.exportForm.value.kilogram)});
    this.total = (+this.exportForm.value.price) * (+this.exportForm.value.kilogram);
  }

  createExport() {
    const exports: Export = this.exportForm.value;
    console.log(this.exportForm.value);
    if (this.exportForm.value.typePigs === 'L???n th???t') {
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
    this.exportService.createExport(exports).subscribe(value => {
      this.toast.success('Th??m m???i th??nh c??ng', 'Th??ng b??o');
      this.exportForm.reset();
      this.router.navigateByUrl('/export/page');
    }, error => {
      this.toast.error('X???y ra l???i', 'Th??ng b??o');
    });
  }

  checkCode($event: Event) {
    this.exportService.checkCode(String($event)).subscribe(
      value => {
        if (value) {
          this.isExitsCode = true;
        } else {
          this.isExitsCode = false;
        }
      }
    );
  }

  reset() {
    this.exportForm = new FormGroup({
      codeExport: new FormControl('', [Validators.required, Validators.pattern('^(MC-)+([0-9]{2})$')]),
      company: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      employeeName: new FormControl('', [Validators.required]),
      kilogram: new FormControl('', [Validators.required, Validators.min(0)]),
      saleDate: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      total: new FormControl('', [Validators.required, Validators.min(0)]),
      typePigs: new FormControl('', [Validators.required]),
      pigsty: new FormControl('', [Validators.required]),
      employee: new FormControl('', [Validators.required])
    });
  }


}
