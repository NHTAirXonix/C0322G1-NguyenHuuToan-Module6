import { Component, OnInit } from '@angular/core';
import {Export} from '../../model/export';
import {FormControl, FormGroup} from '@angular/forms';
import {ExportService} from '../../service/export.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.css']
})
export class ExportListComponent implements OnInit {
  listExport: Export[] = [];
  searchForm: FormGroup = new FormGroup({
    codeExport: new FormControl(''),
    companySearch: new FormControl(''),
    employeeSearch: new FormControl('')
  });
  checkAll = false;
  ids: number[];
  error: string;
  check: string[] = [];
  number: number;
  codeExport = '';
  companySearch = '';
  employeeSearch = '';
  indexPagination = 0;
  totalPage: Array<number>;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  totalElements = 0;
  pageSize: number;
  displayPagination = 'inline-block';
  numberOfElement = 0;
  deleteList: Export[] = [];

  constructor(private exportService: ExportService,
              private toast: ToastrService,
              private title: Title) {
    this.title.setTitle('Chuồng Xuất');
  }

  ngOnInit(): void {
    this.getListExport();
  }

  getListExport() {
    this.exportService.getAll(this.indexPagination, this.codeExport.trim(), this.companySearch.trim(), this.employeeSearch.trim(), this.pageSize).subscribe((data?: any) => {
      if (data === null) {
        this.totalPage = new Array(0);
        this.listExport = [];
        this.displayPagination = 'none';
        this.toast.warning('Không có dữ liệu.', 'Chú ý');
      } else {
        this.number = data?.number;
        this.pageSize = data?.size;
        this.numberOfElement = data?.numberOfElements;
        this.listExport = data.content;
        this.totalElements = data?.totalElements;
        this.totalPage = new Array(data?.totalPages);
      }
      this.checkPreviousAndNext();
      this.isCheckedAll();
    }, error1 => {
      this.listExport = null;
    });
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

  searchExport() {
    this.codeExport = this.searchForm.value.codeExport;
    this.companySearch = this.searchForm.value.companySearch;
    this.employeeSearch = this.searchForm.value.employeeSearch;

    if (this.checkRegex(this.codeExport, this.companySearch, this.employeeSearch)) {
      this.indexPagination = 0;
      this.totalPage = new Array(0);
      this.listExport = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.ngOnInit();
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

  resetId() {
    this.ids = [];
    this.ngOnInit();
    this.check = [];
    this.toast.error('Đã hủy yêu cầu xóa.', 'Chú ý', {
      timeOut: 2500, progressBar: false
    });
  }

  deleteId() {
    if (this.ids.length > 0) {
      this.exportService.deleteExport(this.ids).subscribe(value1 => {
        this.getListExport();
        this.toast.success('Xóa thành công ', 'Thông báo');
        this.ids = [];
      }, err => {
        this.getListExport();
        console.log(err);
      });
    } else {
      this.toast.error('Bạn phải chọn mục để xóa.', 'Thông báo');
    }
    this.deleteList = [];
    this.ids = [];
  }

  getListDelete(exportDelete: Export) {
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === exportDelete.id) {
        this.deleteList.splice(i, 1);
        return;
      }
    }
    this.deleteList.push(exportDelete);
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

  checkbox(exportDelete: Export) {
    for (const item of this.deleteList) {
      if (item.id === exportDelete.id) {
        return true;
      }
    }
    return false;
  }
  checkALl(event: any) {
    this.checkAll = event.target.checked;
    if (this.checkAll) {
      this.listExport.forEach(item => {
        if (!this.checkbox(item)) {
          this.deleteList.push(item);
        }
      });
      for (const item of this.deleteList) {
        this.ids.push(item.id);
        console.log(this.ids + ' ids delete');
      }
    } else {
      this.deleteList = this.deleteList.filter(item => !this.listExport.some(item2 => item.id === item2.id));
    }
  }

  isCheckedAll() {
    const listDeleted = this.deleteList.filter((item) => this.listExport.some(item2 => item.id === item2.id));
    const lengthDeleted = listDeleted.filter(
      (vaccination, index) => index === listDeleted.findIndex(
        other => vaccination.id === other.id
      )).length;
    this.checkAll = lengthDeleted === this.listExport.length;
  }

  // kiểm tra nhập kí tự đặc biệt trên ô tìm kiếm.
  checkRegex(codeExport: string, company: string, nameEmployee: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(codeExport) || format.test(company) || format.test(nameEmployee);
  }
}
