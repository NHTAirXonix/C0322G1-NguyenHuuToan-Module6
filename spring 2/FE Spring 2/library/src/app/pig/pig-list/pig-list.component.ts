import {Component, OnInit} from '@angular/core';
import {Pig} from '../../model/pig';
import {FormControl, FormGroup} from '@angular/forms';
import {PigService} from '../../service/pig.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

const URL_PIG = 'http://localhost:8080/pig';

@Component({
  selector: 'app-pig-list',
  templateUrl: './pig-list.component.html',
  styleUrls: ['./pig-list.component.css']
})
export class PigListComponent implements OnInit {


  pigs: Pig[] = [];
  code: string;
  dateIn: string;
  status: string;
  page = 0;
  searchForm: FormGroup;
  totalPages: number;
  number: number;
  countTotalPages: number[];
  idDelete: number;
  formCheckBox: FormGroup;
  nameDelete: any = [];
  ids: number[] = [];
  msg: string;
  clss: string;
  content: string;
  previousPageClass: any;
  nextPageClass: any;
  dateInSearch = '';
  statusSearch = '';
  codeSearch = '';
  check: string[] = [];
  editId: string;
  informationDelete: Pig[];
  deleteList: number[] = [];
  checkNext: boolean;
  checkPrevious: boolean;
  totalPage: Array<number>;
  indexPagination = 0;
  pages: Array<number>;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  totalElements = 0;
  pageSize = 5;
  displayPagination = 'inline-block';
  numberOfElement = 0;

  constructor(private pigService: PigService,
              private toastrService: ToastrService,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Cá thể');
  }

  ngOnInit(): void {
    this.getList();
    // this.getAll(0);
    this.searchForm = new FormGroup({
      codeSearch: new FormControl(''),
      dateInSearch: new FormControl(''),
      statusSearch: new FormControl(''),
    });
    // this.getListBySearchAndPagination();
  }

  getList() {
    this.pigService.getAllPig(this.indexPagination, this.codeSearch, this.dateInSearch, this.statusSearch, this.pageSize).subscribe((data?: any) => {
      if (data === null) {
        this.totalPage = new Array(0);
        this.pigs = [];
        this.displayPagination = 'none';
        this.toastrService.warning('Không có dữ liệu.', 'Chú ý');
      } else {
        this.number = data?.number;
        this.pageSize = data?.size;
        this.numberOfElement = data?.numberOfElements;
        this.pigs = data.content;
        this.totalElements = data?.totalElements;
        this.totalPage = new Array(data?.totalPages);
      }
      this.checkPreviousAndNext();
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

  checkRegex(codeSearch: string, statusSearch: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(codeSearch) || format.test(statusSearch);
  }

  searchPig() {
    this.codeSearch = this.searchForm.value.codeSearch;
    this.statusSearch = this.searchForm.value.statusSearch;
    if (this.checkRegex(this.searchForm.value.codeSearch, this.searchForm.value.statusSearch)) {
      this.indexPagination = 0;
      this.totalPage = new Array(0);
      this.pigs = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      this.toastrService.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
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

  resetDelete() {
    this.nameDelete = [];
    this.ids = [];
  }

  deleteId() {
    if (this.ids.length > 0) {
      this.pigService.deletePig(this.ids).subscribe(value1 => {
        this.getList();
        this.toastrService.success('Xóa thành công!', 'Thông báo');
        this.ids = [];
      }, err => {
        this.clss = 'rd';
        this.msg = 'Có sự cố khi xóa cá thể';
      });
    } else {
      this.clss = 'rd';
      this.msg = 'Bạn phải chọn cá thể mới thực hiện được chức năng này';
      this.toastrService.error('Bạn phải chọn mục để xóa !!!', 'Cá thể');
    }
    this.nameDelete = [];
  }

  checkDelete(value: any) {
    this.ids = [];
    this.msg = '';
    this.nameDelete = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.pigs.length; i++) {
      if (value[this.pigs[i].id] === true) {
        this.ids.push(this.pigs[i].id);
        this.nameDelete.push(this.pigs[i].code);
      }
    }
    this.pigService.getAllPig(0, '', '', '', 0).subscribe(() => {
    });
  }

  checkButton(value: any) {
    this.msg = '';
    if (this.check.includes(value)) {
      this.check.filter(item => item !== value);
      for (let i = 0; i < this.check.length; i++) {
        if (this.check[i] === value) {
          this.check.splice(i, 1);
        }
      }
    } else {
      this.check.push(value);
    }
    if (this.check.length > 1) {
      this.editId = null;
    } else {
      this.editId = this.check[0];
    }
  }

  getListDelete(pigDelete: Pig) {
    for (let i = 0; i < this.nameDelete.length; i++) {
      if (this.nameDelete[i].id === pigDelete.id) {
        this.nameDelete.splice(i, 1);
        return;
      }
    }
    this.nameDelete.push(pigDelete);
    this.ids = [];
    this.informationDelete = [];
    for (const item of this.nameDelete) {
      this.ids.push(item.id);
      this.informationDelete.push(item.title);
    }
  }

  checkbox(pigDelete: Pig) {
    for (const item of this.nameDelete) {
      if (item.id === pigDelete.id) {
        return true;
      }
    }
    return false;
  }

  showEdit() {
    return (this.deleteList.length === 1);
  }

  edit() {
    if (this.deleteList.length === 1) {
      this.router.navigateByUrl('pig/update/' + this.deleteList[0]).then(r => console.log(r));
    }
  }

  omit_special_char(event) {
    let k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57));
  }
}
