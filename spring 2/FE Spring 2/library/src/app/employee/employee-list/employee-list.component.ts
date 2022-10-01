import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import {ToastrService} from 'ngx-toastr';

import {Title} from '@angular/platform-browser';
import {EmployeeDto} from '../../model/employee-dto';
import {EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: EmployeeDto[] = [];

  // Modal delete
  codeModal: string;
  nameModal: string;
  idModal: number;

  // search
  nameSearchForm = new FormControl('');
  idCardSearchForm = new FormControl('');
  nameSearch = '';
  idCardSearch = '';


  // pagination
  indexPagination = 0;
  pages: Array<number>;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  totalElements = 0;
  pageSize = 6;
  displayPagination = 'inline-block';
  numberOfElement = 0;


  // Modal detail
  employeeDetail: EmployeeDto = {};

  constructor(private employeeService: EmployeeService,
              private toast: ToastrService,
              private title: Title) {
    this.title.setTitle('Danh sách nhân viên');
  }

  ngOnInit(): void {
    this.getListBySearchAndPagination();
  }

  getListBySearchAndPagination() {
    this.employeeService.getListEmployeeBySearchAndPagination(this.nameSearch, this.idCardSearch,
      this.indexPagination, this.pageSize).subscribe(data => {
      if (data === null) {
        this.pages = new Array(0);
        this.employeeList = [];
        this.displayPagination = 'none';
        this.toast.warning('Không có dữ liệu.', 'Chú ý');
      } else {
        this.numberOfElement = data.numberOfElements;
        this.employeeList = data.content;
        this.totalElements = data.totalElements;
        this.pages = new Array(data.totalPages);
      }
      this.checkPreviousAndNext();
    });
  }

  previousPage(event: any) {
    event.preventDefault();
    this.indexPagination--;
    this.ngOnInit();
  }

  setPage(i: number, event: any) {
    event.preventDefault();
    this.indexPagination = i;
    this.getListBySearchAndPagination();
  }

  nextPage(event: any) {
    event.preventDefault();
    this.indexPagination++;
    this.ngOnInit();
  }

  // kiem tra hien thi nut tiep theo va truoc
  checkPreviousAndNext() {
    if (this.indexPagination === 0) {
      this.previousPageStyle = 'none';
    } else if (this.indexPagination !== 0) {
      this.previousPageStyle = 'inline-block';
    }
    if (this.indexPagination < (this.pages.length - 1)) {
      this.nextPageStyle = 'inline-block';
    } else if (this.indexPagination === (this.pages.length - 1) || this.indexPagination > (this.pages.length - 1)) {
      this.nextPageStyle = 'none';
    }
  }

  getEmployeeById(id: number) {
    this.employeeService.getEmployeeById(id).subscribe(data => {
      this.employeeDetail = data;
    });
  }

  searchEmployee() {
    this.nameSearch = this.nameSearchForm.value.trim();
    this.idCardSearch = this.idCardSearchForm.value.trim();
    if (this.checkRegex(this.nameSearch, this.idCardSearch)) {
      this.indexPagination = 0;
      this.pages = new Array(0);
      this.employeeList = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.getListBySearchAndPagination();
    }
  }

  getModal(id: number, code: string, name: string) {
    this.codeModal = code;
    this.nameModal = name;
    this.idModal = id;
  }

  deleteEmployee() {
    if (this.employeeList.length === 1 && this.indexPagination !== 0) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.employeeService.deleteEmployee(this.idModal).subscribe(() => {
    }, error => {
      console.log(error);
    }, () => {
      this.toast.success('Xóa thành công', 'Thông báo');
      this.ngOnInit();
    });
  }

  // kiểm tra nhập kí tự đặc biệt trên ô tìm kiếm.
  checkRegex(name: string, idCard: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(name) || format.test(idCard);
  }

  changePageSize(event: any) {
    switch (event.target.value) {
      case '6' :
        this.pageSize = 6;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '9' :
        this.pageSize = 9;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '12':
        this.pageSize = 12;
        this.indexPagination = 0;
        this.ngOnInit();
        break;

    }
  }

}
