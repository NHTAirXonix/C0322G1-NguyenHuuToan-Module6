import {Component, OnInit} from '@angular/core';
import {Treatment} from '../../model/treatment';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {TreatmentService} from '../../service/treatment.service';
import {isDate} from 'rxjs/internal-compatibility';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-treatment',
  templateUrl: './treatment-create.component.html',
  styleUrls: ['./treatment-create.component.css']
})
export class TreatmentCreateComponent implements OnInit {
  listPigsty: any;
  listPig: any;
  treatment: Treatment[];
  check = false;
  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  creatTreatmentForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    pigstyCode: new FormControl('', [Validators.required]),
    date: new FormControl(this.today, [this.dateNotExist]),
    doctor: new FormControl('', [Validators.required]),
    diseases: new FormControl('', [Validators.required]),
    medicine: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
    pig: new FormControl('', [Validators.required]),
    isDelete: new FormControl('0')
  });

  constructor(private treatmentService: TreatmentService,
              private datePipe: DatePipe,
              private router: Router,
              private toastrService: ToastrService) {
  }
  dateNotExist(abstractControl: AbstractControl) {
    const v = abstractControl.value;
    const start = new Date(v);
    if (!isDate(start)) {
      return {dateNotExist: true, message: 'Nhập ngày hợp lệ'};
    }
  }
  ngOnInit(): void {
    this.treatmentService.getListPigsty().subscribe( value => {
      this.listPigsty = value;
    }, error => {
      this.toastrService.error('Hiện không kết nối được dữ liêu', 'Thông báo');
    });
  }

  submit() {
    this.check = true;
    const saving = this.creatTreatmentForm.value;
    this.treatmentService.save(saving).subscribe(() => {
      this.toastrService.success('Thêm mới thành công.', 'Thông báo');
      this.router.navigate(['/treatment']);
    }, error => {
      this.toastrService.warning('Vui lòng nhập các trường bắt buộc.', 'Cảnh báo.');
    });
  }

  getPigByPigstyId(id: number) {
    this.treatmentService.getListPig(id).subscribe( value => {
      this.listPig = value;
    }, error => {
      this.toastrService.error('Hiện không kết nối được dữ liêu', 'Thông báo');
    });
  }
}
