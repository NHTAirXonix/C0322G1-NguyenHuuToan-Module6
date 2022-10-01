import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NotificationService} from '../../service/notification.service';
import {Notifications} from '../../model/notification';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  msg: string;
  clss: string;
  notifications: Notifications[] = [];
  ids: number[] = [];
  title: any;
  searchForm = new FormGroup({
    content: new FormControl('')
  });
  deleteList: Notifications[] = [];
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
  contentSearch = '';
  notificationDeleted: Notifications;

  checkedAll = false;


  constructor(private notificationService: NotificationService,
              private router: Router,
              private toast: ToastrService,
              private title1: Title) {
    this.title1.setTitle('Đăng thông báo');
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.notificationService.getAllNotifications(this.indexPagination, this.contentSearch, this.pageSize).subscribe((data?: any) => {
        if (data === null) {
          this.totalPage = new Array(0);
          this.notifications = [];
          this.displayPagination = 'none';
        } else {
          this.number = data?.number;
          this.pageSize = data?.size;
          this.numberOfElement = data?.numberOfElements;
          this.notifications = data.content;
          this.totalElements = data?.totalElements;
          this.totalPage = new Array(data?.totalPages);
        }
        this.checkPreviousAndNext();
        this.isCheckedAll();
      }, error => {
        this.notifications = null;
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

  checkRegex(content: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(content);
  }

  search() {
    this.contentSearch = this.searchForm.value.content;

    if (this.checkRegex(this.contentSearch)) {
      this.indexPagination = 0;
      this.totalPage = new Array(0);
      this.notifications = [];
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
    this.deleteList = [];
    this.isCheckedAll();
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
      this.notificationService.deleteNotifications(this.ids).subscribe(value1 => {
        this.contentSearch = '';
        this.getList();
        this.toast.success('Xóa thành công ', 'Thông báo');
      }, err => {
        this.clss = 'rd';
        this.msg = 'Có sự cố khi xóa thông báo';
      });
    } else {
      this.clss = 'rd';
      this.msg = 'Bạn phải chọn thông báo mới thực hiện được chức năng này';
      this.toast.error('Bạn phải chọn mục để xóa !!!', 'Thông báo');
    }
    this.deleteList = [];
    this.ids = [];
  }

  getListDelete(notification: Notifications) {
    this.notificationDeleted = this.deleteList.find(value => value.id === notification.id);
    if (this.notificationDeleted) {
      this.deleteList = this.deleteList.filter(value => value.id !== this.notificationDeleted.id);
    } else {
      this.deleteList.push(notification);
    }
    for (let i = 0; i < this.deleteList.length; i++) {
      if (!this.ids.includes(this.deleteList[i].id)) {
        this.ids.push(this.deleteList[i].id);
      } else {
        this.ids.splice(i, 1);
        this.ids.push(this.deleteList[i].id);
      }
    }
    this.isCheckedAll();
  }

  isCheckedAll() {
    const listDeleted = this.deleteList.filter((item) => this.notifications.some(item2 => item.id === item2.id));
    const lengthDeleted = listDeleted.filter(
      (notification, index) => index === listDeleted.findIndex(
        other => notification.id === other.id
      )).length;
    this.checkedAll = lengthDeleted === this.notifications.length;
  }

  checkAll(event: any) {
    this.checkedAll = event.target.checked;
    if (this.checkedAll) {
      this.notifications.forEach(item => {
        if (!this.deleteList.includes(item)) {
          this.deleteList.push(item);
        }
      });
      for (let i = 0; i <= this.deleteList.length; i++) {
        if (!this.ids.includes(this.deleteList[i].id)) {
          this.ids.push(this.deleteList[i].id);
        } else {
          this.ids.splice(i, 1);
          this.ids.push(this.deleteList[i].id);
        }
      }
    } else {
      this.deleteList = this.deleteList.filter(item => !this.deleteList.some(item2 => item.id === item2.id));
    }
  }

  checkbox(notification: Notifications) {
    for (const item of this.deleteList) {
      if (item.id === notification.id) {
        return true;
      }
    }
    return false;
  }

  resetDelete() {
    this.ids = [];
  }
}
