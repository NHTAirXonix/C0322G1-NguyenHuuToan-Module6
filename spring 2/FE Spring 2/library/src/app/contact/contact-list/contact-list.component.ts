import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Contact} from '../../model/contact';
import {ContactService} from '../../service/contact.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  msg: string;
  clss: string;
  totalPages: number;
  searchForm = new FormGroup({
    name: new FormControl('')
  });
  contactList: Contact[] = [];
  nameDelete: any = [];
  ids: number[] = [];
  check: any[] = [];
  informationDelete: Contact[] = [];
  content = '';
  contactDeleted: Contact;
  contactDetail: Contact = {};
  checkedAll = false;
  pages: Array<number>;
  name = '';
  number = 0;
  pageSize = 5;
  indexPagination = 0;
  numberOfElement = 0;
  totalElements = 0;
  displayPagination = 'inline-block';
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';

  constructor(private contactService: ContactService,
              private router: Router,
              private toast: ToastrService,
              private title: Title) {
    this.title.setTitle('Danh Sách Liên Hệ');
  }

  ngOnInit(): void {
    this.getContact();

  }

  getContact() {
    this.contactService.getAllContact(this.indexPagination, this.name, this.pageSize).subscribe(value => {
        if (value == null) {
          this.contactList = [];
          this.displayPagination = 'none';
          this.pages = new Array(0);
          this.toast.warning('Không có dữ liệu.', 'Chú ý');
        } else {
          this.numberOfElement = value.numberOfElements;
          this.contactList = value.content;
          this.totalElements = value.totalElements;
          this.pages = new Array(value.totalPages);
          this.number = value?.number;
        }
        this.checkPreviousAndNext();
        this.isCheckedAll();
      }, error => {
        this.contactList = null;
      }
    );
  }

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

  deleteId() {
    const id: number[] = [];
    for (const argument of this.informationDelete) {
      id.push(argument.id);
    }
    if (id.length > 0) {
      this.contactService.deleteContact(id).subscribe(value1 => {
        this.indexPagination = 0;
        this.name = '';
        this.getContact();
        this.toast.success('Xóa thành công', 'Liên hệ');
        this.informationDelete = [];
      }, err => {
        this.clss = 'rd';
        this.msg = 'Có sự cố khi xóa liên hệ';
      });
    } else {
      this.clss = 'rd';
      this.msg = 'Bạn phải chọn liên hệ mới thực hiện được chức năng này.';
      this.toast.error('Bạn phải chọn mục để xóa', 'Liên hệ');
    }
    this.nameDelete = [];
  }

  resetDelete() {
    this.nameDelete = [];
    this.ids = [];
    this.informationDelete = [];
  }

  search() {
    this.name = this.searchForm.value.name.trim();
    if (this.checkRegex(this.name)) {
      this.indexPagination = 0;
      this.pages = new Array(0);
      this.contactList = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.getContact();
    }
  }

  checkRegex(name: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(name);
  }

  getDetails() {
    this.contactDetail = this.informationDelete[0];
  }

  checkbox(contact: Contact) {
    for (const item of this.informationDelete) {
      if (item.id === contact.id) {
        return true;
      }
    }
    return false;
  }

  checkList(contact: Contact) {
    this.contactDeleted = this.informationDelete.find(deleteObject => deleteObject.id === contact.id);
    if (this.contactDeleted) {
      this.informationDelete = this.informationDelete.filter(contactDelete => contactDelete.id !== this.contactDeleted.id);
    } else {
      this.informationDelete.push(contact);
    }

    this.isCheckedAll();
  }

  checkAll(event: any) {
    this.checkedAll = event.target.checked;
    if (this.checkedAll) {
      this.contactList.forEach(item => {
        if (!this.informationDelete.includes(item)) {
          this.informationDelete.push(item);
        }
      });
    } else {
      this.informationDelete = this.informationDelete.filter(item => !this.contactList.some(item2 => item.id === item2.id));
    }
  }

  isCheckedAll() {
    const listDeleted = this.informationDelete.filter((item) => this.contactList.some(item2 => item.id === item2.id));
    const lengthDeleted = listDeleted.filter(
      (contact, index) => index === listDeleted.findIndex(
        other => contact.id === other.id
      )).length;
    this.checkedAll = lengthDeleted === this.contactList.length;
  }

  showDetail() {
    return !(this.informationDelete.length === 1);
  }

  changePageSize(event: any) {

    switch (event.target.value) {
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
}
