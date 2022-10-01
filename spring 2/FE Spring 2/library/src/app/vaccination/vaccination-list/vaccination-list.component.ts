import {Component, OnInit} from '@angular/core';
import {Vaccination} from '../../model/vaccination';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {VaccinationService} from '../../service/vaccination.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-vaccination-list',
  templateUrl: './vaccination-list.component.html',
  styleUrls: ['./vaccination-list.component.css']
})
export class VaccinationListComponent implements OnInit {
  vaccins: Vaccination[] = [];
  number: 0;
  msg: string;
  clss: string;
  nameDelete: any = [];
  ids: number[] = [];
  checkNext: boolean;
  nameContent = '';
  informationDelete: Vaccination[] = [];
  public e: any;
  vaccinationDelete: Vaccination;
  checkAll = false;
  displayPagination = 'inline-block';
  pageSize = 5;
  indexPagination = 0;
  numberOfElement = 0;
  totalElements = 0;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  pages: Array<number>;
  searchForm: FormGroup = new FormGroup({
    vaccinPerson: new FormControl('')
  });


  constructor(private vaccinService: VaccinationService,
              private router: Router,
              private toast: ToastrService,
              private title: Title) {
    this.title.setTitle('Thông tin tiêm phòng');
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.vaccinService.findAll(this.indexPagination, this.nameContent, this.pageSize).subscribe(value => {
        if (value == null) {
          this.vaccins = [];
          this.displayPagination = 'none';
          this.pages = new Array(0);
        } else {
          this.numberOfElement = value.numberOfElements;
          this.vaccins = value.content;
          this.totalElements = value.totalElements;
          this.pages = new Array(value.totalPages);
          this.number = value?.number;
        }
        this.checkPreviousAndNext();
        this.isCheckedAll();
      }, error => {
        this.vaccins = null;
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

  searchVaccin() {
    this.nameContent = this.searchForm.value.vaccinPerson.trim();
    if (this.checkRegex(this.nameContent)) {
      this.indexPagination = 0;
      this.pages = new Array(0);
      this.vaccins = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.getAll();
    }
  }

  checkRegex(name: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(name);
  }

  deleteId() {
    const id: number[] = [];
    for (const argument of this.informationDelete) {
      id.push(argument.id);
    }
    if (id.length > 0) {
      this.vaccinService.deleteVaccination(id).subscribe(value1 => {
        this.indexPagination = 0;
        this.nameContent = '';
        this.getAll();
        this.toast.success('Xóa thành công', 'Tiêm phòng');
        this.informationDelete = [];
      }, err => {
        this.clss = 'rd';
        this.msg = 'Có sự cố khi xóa liên hệ';
      });
    } else {
      this.clss = 'rd';
      this.msg = 'Bạn phải lịch tiêm phòng hệ mới thực hiện được chức năng này.';
      this.toast.error('Bạn phải chọn mục để xóa', 'Tiêm phòng');
    }
    this.nameDelete = [];
  }

  resetDelete() {
    this.nameDelete = [];
    this.ids = [];
    this.informationDelete = [];
  }

  getListDelete(vaccinationDelete: Vaccination) {
    for (let i = 0; i < this.informationDelete.length; i++) {
      if (this.informationDelete[i].id === vaccinationDelete.id) {
        this.informationDelete.splice(i, 1);
        return;
      }
    }
    this.informationDelete.push(vaccinationDelete);
  }

  checkbox(vaccination: Vaccination) {
    for (const item of this.informationDelete) {
      if (item.id === vaccination.id) {
        return true;
      }
    }
    return false;
  }

  changePageSize(event: any) {
    switch (event.target.value) {
      case '5' :
        this.pageSize = 5;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '10' :
        this.pageSize = 10;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '15' :
        this.pageSize = 15;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case 'full list' :
        this.pageSize = this.totalElements;
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

  checkList(vaccination: Vaccination) {
    this.vaccinationDelete = this.informationDelete.find(deleteObject => deleteObject.id === vaccination.id);
    if (this.vaccinationDelete) {
      this.informationDelete = this.informationDelete.filter(contactDelete => contactDelete.id !== this.vaccinationDelete.id);
    } else {
      this.informationDelete.push(vaccination);
    }
    this.isCheckedAll();
  }

  checkALl(event: any) {
    this.checkAll = event.target.checked;
    if (this.checkAll) {
      this.vaccins.forEach(item => {
        if (!this.checkbox(item)) {
          this.informationDelete.push(item);
        }
      });
    } else {
      this.informationDelete = this.informationDelete.filter(item => !this.vaccins.some(item2 => item.id === item2.id));
    }
  }

  isCheckedAll() {
    const listDeleted = this.informationDelete.filter((item) => this.vaccins.some(item2 => item.id === item2.id));
    const lengthDeleted = listDeleted.filter(
      (vaccination, index) => index === listDeleted.findIndex(
        other => vaccination.id === other.id
      )).length;
    this.checkAll = lengthDeleted === this.vaccins.length;
  }
}
