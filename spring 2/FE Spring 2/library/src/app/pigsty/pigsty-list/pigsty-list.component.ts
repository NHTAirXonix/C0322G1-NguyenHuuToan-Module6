import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Pigsty} from '../../model/pigsty';
import {PigstyService} from '../../service/pigsty.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-item-list',
  templateUrl: './pigsty-list.component.html',
  styleUrls: ['./pigsty-list.component.css']
})
export class PigstyListComponent implements OnInit {
  msg: string;
  clss: string;
  totalPages: number;
  number = 0;
  pigstyList: Pigsty[] = [];
  searchForm = new FormGroup({
    name: new FormControl('')
  });
  content = '';
  checkContent = false;
  name = '';
  displayPagination = 'inline-block';
  pageSize = 5;
  indexPagination = 0;
  numberOfElement = 0;
  totalElements = 0;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  pages: Array<number>;

  constructor(private pigstyService: PigstyService,
              private router: Router,
              private title: Title, private toast: ToastrService) {
    this.title.setTitle('Danh Sách Liên Hệ');
  }

  ngOnInit(): void {
    this.getPigstys();

  }

  getPigstys() {
    this.pigstyService.getAll(this.indexPagination, this.name, this.pageSize).subscribe(value => {
        this.pigstyList = value.content;
        if (this.pigstyList.length === 0) {
          this.checkContent = true;
          this.pigstyList = [];
          this.displayPagination = 'none';
          this.pages = new Array(0);
        } else {
          this.checkContent = false;
          this.numberOfElement = value.numberOfElements;
          this.totalElements = value.totalElements;
          this.pages = new Array(value.totalPages);
        }
        this.checkPreviousAndNext();
      }, error => {
        this.pigstyList = null;
      }
    );
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

  search() {
    this.name = this.searchForm.value.name.trim();
    if (this.checkRegex(this.name)) {
      this.indexPagination = 0;
      this.pages = new Array(0);
      this.pigstyList = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.getPigstys();
    }
  }

  checkRegex(name: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(name);
  }

  changePageSize(event: any) {
    this.pageSize = +event.target.value;
    this.ngOnInit();
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
