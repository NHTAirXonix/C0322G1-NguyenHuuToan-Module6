import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../service/storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-storage-employee-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css']
})
export class StorageListComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    // tslint:disable-next-line:max-line-length
    foodType: new FormControl('', [Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9-_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$')])
  });
  storageList: Storage[] = [];
  // pagination
  number: number;
  indexPagination = 0;
  totalPage: Array<number>;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  totalElements = 0;
  pageSize: number;
  displayPagination = 'inline-block';
  numberOfElement = 0;
  foodTypes = '';

  constructor(private storageService: StorageService,
              private toastrService: ToastrService,
              private title: Title) {
    this.title.setTitle('Danh Sách Khối Lượng Thức Ăn Trong Kho');
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.storageService.getAll(this.indexPagination, this.foodTypes, this.pageSize).subscribe((data?: any) => {
      if (data === null) {
        this.totalPage = new Array(0);
        this.storageList = [];
        this.displayPagination = 'none';
        this.toastrService.warning('Không có dữ liệu.', 'Chú ý');
      } else {
        this.number = data?.number;
        this.pageSize = data?.size;
        this.numberOfElement = data?.numberOfElements;
        this.storageList = data.content;
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

  checkRegex(titileSearch: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(titileSearch);
  }

  searchStorage() {
    this.foodTypes = this.searchForm.value.foodType;
    if (this.checkRegex(this.searchForm.value.foodType)) {
      this.indexPagination = 0;
      this.totalPage = new Array(0);
      this.storageList = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      this.toastrService.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.getList();
    }
    console.log(this.foodTypes);
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


}
