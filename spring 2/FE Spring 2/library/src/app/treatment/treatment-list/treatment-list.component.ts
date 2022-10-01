import {Component, OnInit} from '@angular/core';
import {Treatment} from '../../model/treatment';
import {TreatmentService} from '../../service/treatment.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css']
})
export class TreatmentListComponent implements OnInit {
  treatmentList: Treatment[] = [];
  deleteList: Treatment[] = [];
  keySearch: string;
  searchForm = new FormGroup({
    content: new FormControl('')
  });

  checkNext: boolean;
  checkPreview: boolean;
  number: number;
  checkDelete = true;
  checkedAll = false;

  totalElements: number;
  pageSize = 5;

  numberOfElementFirst: number;
  numberOfElementFinal: number;
  checkError = true;

  constructor(private treatmentService: TreatmentService, private toastrService: ToastrService,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Khám chữa bệnh');
    this.getAll(0);
  }

  getAll(page: number) {
    if (this.keySearch === 'null' || this.keySearch === '#') {
      return this.treatmentList = [];
    }
    if (this.keySearch === undefined) {
      this.keySearch = '';
    }
    this.treatmentService.getAll(page, this.keySearch, this.pageSize).subscribe((data?: any) => {
      if (data?.content.length < 1 || data?.content.length === undefined) {
        this.treatmentList = [];
        return;
      }
      this.number = data?.number;
      this.checkNext = !data.last;
      this.checkPreview = !data.first;
      this.treatmentList = data?.content;
      this.totalElements = data?.totalElements;
      this.numberOfElementFinal = 1 + data?.size * data?.number;
      this.numberOfElementFirst = data?.numberOfElements + data?.size * data?.number;
      this.isCheckedAll();
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  delete() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.deleteList.length; i++) {
      this.treatmentService.deleteTreatment(this.deleteList[i].id).subscribe(() => {
        this.checkError = true;
        this.deleteList.splice(0, this.deleteList.length);
        this.checkDelete = this.deleteList.length < 1;
        this.ngOnInit();
      }, error => {
        this.checkError = false;
        this.toastrService.error(`Xóa không thành công.`, 'Cảnh báo');
        this.deleteList.splice(0, this.deleteList.length);
        console.log('error', error);
      });
    }
    if (this.checkError === true) {
      this.toastrService.success('Xóa thành công.', 'Thông báo');
    }
  }

  search() {
    this.keySearch = this.searchForm.value.content;
    this.ngOnInit();
  }

  getListDelete(treatment: Treatment) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === treatment.id) {
        this.deleteList.splice(i, 1);
        this.checkDelete = this.deleteList.length < 1;
        this.isCheckedAll();
        return;
      }
    }
    this.deleteList.push(treatment);
    this.isCheckedAll();
    this.checkDelete = this.deleteList.length < 1;
  }

  goPrevious() {
    this.number--;
    this.getAll(this.number);
  }

  goNext() {
    this.number++;
    this.getAll(this.number);
  }

  checkbox(treatment: Treatment) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === treatment.id) {
        return true;
      }
    }
    return false;
  }

  totalElement($event: any) {
    switch ($event.target.value) {
      case '5':
        this.pageSize = 5;
        this.ngOnInit();
        break;
      case '10':
        this.pageSize = 10;
        this.ngOnInit();
        break;
      case '15':
        this.pageSize = 15;
        this.ngOnInit();
        break;
      case 'full':
        this.pageSize = this.totalElements;
        this.ngOnInit();
        break;
    }
  }


  checkAll(event: any) {
    this.checkedAll = event.target.checked;
    if (this.checkedAll) {
      this.treatmentList.forEach(item => {
        if (!this.checkbox(item)) {
          this.deleteList.push(item);
        }
      });
    } else {
      this.deleteList = this.deleteList.filter(item => !this.treatmentList.some(item2 => item.id === item2.id));
    }
    this.checkDelete = this.deleteList.length < 1;
  }

  isCheckedAll() {
    const listDeleted = this.deleteList.filter((item) => this.treatmentList.some(item2 => item.id === item2.id));
    const lengthDeleted = listDeleted.filter(
      (treatment, index) => index === listDeleted.findIndex(
        other => treatment.id === other.id
      )).length;
    this.checkedAll = (lengthDeleted === this.treatmentList.length);
  }
}
