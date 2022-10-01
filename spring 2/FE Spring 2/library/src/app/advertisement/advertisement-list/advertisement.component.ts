import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Advertisement} from '../../model/advertisement';
import {AdvertisementService} from '../../service/advertisement.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    titleSearch: new FormControl('')
  });
  advertisementList: Advertisement[] = [];
  ids: number[] = [];
  deleteList: Advertisement[] = [];
  check = false;
  number: number;
  indexPagination = 0;
  totalPage: Array<number>;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  totalElements = 0;
  pageSize: number;
  displayPagination = 'inline-block';
  numberOfElement = 0;
  titleSearch = '';

  constructor(private adsService: AdvertisementService, private toastrService: ToastrService, private title: Title) {
    this.title.setTitle('Danh sách quảng cáo');
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.adsService.getListAndSearch(this.indexPagination, this.titleSearch, this.pageSize).subscribe((data?: any) => {
        if (data === null) {
          this.totalPage = new Array(0);
          this.advertisementList = [];
          this.displayPagination = 'none';
        } else {
          this.number = data?.number;
          this.pageSize = data?.size;
          this.numberOfElement = data?.numberOfElements;
          this.advertisementList = data.content;
          this.totalElements = data?.totalElements;
          this.totalPage = new Array(data?.totalPages);
        }
        this.checkPreviousAndNext();
        this.isCheckedAll();
      }, error => {
        this.advertisementList = null;
      }
    );
  }

  previousPage(event: any) {
    event.preventDefault();
    this.indexPagination--;
    this.ngOnInit();
  }

  nextPage(event: any) {
    event.preventDefault();
    this.indexPagination++;
    this.ngOnInit();
  }

  checkPreviousAndNext() {
    if (this.indexPagination === 0) {
      this.previousPageStyle = 'none';
    } else if (this.indexPagination !== 0) {
      this.previousPageStyle = 'inline-block';
    }
    if (this.indexPagination < (this.totalPage.length - 1)) {
      this.nextPageStyle = 'inline-block';
    } else if (this.indexPagination === (this.totalPage.length - 1) || this.indexPagination > (this.totalPage.length - 1)) {
      this.nextPageStyle = 'none';
    }
  }

  checkRegex(titileSearch: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(titileSearch);
  }

  searchAds() {
    this.titleSearch = this.searchForm.value.titleSearch;
    if (this.checkRegex(this.searchForm.value.titleSearch)) {
      this.indexPagination = 0;
      this.totalPage = new Array(0);
      this.advertisementList = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.getList();
    }
  }

  totalElement($event: any) {
    switch ($event.target.value) {
      case '5':
        this.pageSize = 5;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '10':
        this.pageSize = 10;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '15':
        this.pageSize = 15;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case 'full':
        this.pageSize = this.totalElements;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
    }
  }

  deleteId() {
    if (this.ids.length > 0) {
      this.adsService.deleteAdvertisement(this.ids).subscribe(next => {
        this.getList();
        this.toastrService.success('Đã xóa quảng cáo thành công', 'Thông báo');
        this.ids = [];
      });
    }
    this.indexPagination = 0;
    this.deleteList = [];
  }

  resetDelete() {
    this.deleteList = [];
    this.ids = [];
  }

  getListDelete(advertisement: Advertisement) {
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === advertisement.id) {
        this.deleteList.splice(i, 1);
        return;
      }
    }
    this.deleteList.push(advertisement);
    this.ids = [];
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === this.ids[i]) {
        this.ids.splice(i, 1);
        return;
      }
    }
    for (const item of this.deleteList) {
      this.ids.push(item.id);
    }
  }

  checkbox(advertisement: Advertisement) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === advertisement.id) {
        return true;
      }
    }
    return false;
  }

  checkAll(event: any) {
    this.check = event.target.checked;
    if (this.check) {
      this.advertisementList.forEach(item => {
        if (!this.checkbox(item)) {
          this.deleteList.push(item);
        }
      });
      for (const item of this.deleteList) {
        this.ids.push(item.id);
      }
    } else {
      this.deleteList = this.deleteList.filter(item => !this.advertisementList.some(item2 => item.id === item2.id));
    }
  }

  isCheckedAll() {
    const listDeleted = this.deleteList.filter((item) => this.advertisementList.some(item2 => item.id === item2.id));
    const lengthDeleted = listDeleted.filter(
      (vaccination, index) => index === listDeleted.findIndex(
        other => vaccination.id === other.id
      )).length;
    this.check = lengthDeleted === this.advertisementList.length;
  }
}
