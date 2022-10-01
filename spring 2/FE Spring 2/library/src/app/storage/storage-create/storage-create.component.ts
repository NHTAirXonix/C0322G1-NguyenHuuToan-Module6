import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {isDate} from 'rxjs/internal-compatibility';
import {StorageService} from '../../service/storage.service';

@Component({
  selector: 'app-storage-create',
  templateUrl: './storage-create.component.html',
  styleUrls: ['./storage-create.component.css']
})
export class StorageCreateComponent implements OnInit {
  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  storageList: Storage[];

  storageForm: FormGroup = new FormGroup({
    // tslint:disable-next-line:max-line-length
    foodType: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9-_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$')]),
    amount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10000000000)]),
    unit: new FormControl('', [Validators.required]),
    date: new FormControl(this.today, [this.dateNotExist]),
  });

  foodType: string;
  private pageSize: number;

  constructor(private storageService: StorageService,
              private router: Router,
              private toastrService: ToastrService,
              private datePipe: DatePipe,
              private title: Title) {
    this.title.setTitle('Thêm Vào Kho');
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    return this.storageService.getAll(0, this.foodType, this.pageSize).subscribe(storage => {
      this.storageList = storage;
    });
  }

  submit(): void {
    const storage = this.storageForm.value;
    this.storageService.saveStorage(storage).subscribe(() => {
      this.router.navigateByUrl('/storage/page');
      this.toastrService.success('Thêm thành công', 'Thông báo');
      this.storageForm.reset();
    }, e => console.log(e));
  }

  reset() {
    this.storageForm = new FormGroup({
      // tslint:disable-next-line:max-line-length
      foodType: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9-_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$')]),
      amount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10000000000)]),
      unit: new FormControl('', [Validators.required]),
      date: new FormControl(this.today, [this.dateNotExist]),
    });
  }

  dateNotExist(abstractControl: AbstractControl) {
    const v = abstractControl.value;
    const start = new Date(v);
    if (!isDate(start)) {
      return {dateNotExist: true, message: 'Ngày không tồn tại.'};
    }
  }
}
