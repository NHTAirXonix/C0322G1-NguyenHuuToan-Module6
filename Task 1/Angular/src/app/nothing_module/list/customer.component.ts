import {Component, OnInit, Input} from '@angular/core';
import {PeopleService} from '../service/people.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {CardService} from '../service/card.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {People} from '../model/people';
import {CardMedical} from '../model/card-medical';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  peopleList: People[] = [];
  cardList: CardMedical[] = [];

  idPeople: any = '';
  namePeople: any = '';
  displayStyle = 'none';
  idDelete: any;
  p = 1;

  formSearch = this.fb.group({
    nameS: ['', ],
    type: ['', ]
  });

  constructor(private peopleService: PeopleService,
              private cardService: CardService,
              private  fb: FormBuilder,
              private toast: ToastrService) {
  }
  ngOnInit() {
    this.getAll();
  }

  openPopup(idCustomer: any, nameCustomer: any, idDelete: any) {
    this.idPeople = idCustomer;
    this.namePeople = nameCustomer;
    this.displayStyle = 'block';
    this.idDelete = idDelete;
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  getAll() {
    this.peopleList = this.peopleService.getAll().subscribe((next: People[]) => {
      this.peopleList = next;
      // tslint:disable-next-line:no-shadowed-variable
      this.cardService.getAll().subscribe((next: CardMedical[]) => {
        this.cardList = next;
      });
      console.log('aaaaaaaaaaaaaaaaaa');
      console.log(this.peopleList[1]);
    });


  }

  callService() {
    this.peopleService.delete(this.idDelete).subscribe(() => {
      this.getAll();
      this.closePopup();
      this.toast.success('Delete Customer Success !');
    });
  }

  search() {
    const name = this.formSearch.value.nameS;
    let type = '';
    console.log(name + ' xxxxxxx ' + type);
    if (this.formSearch.value.type.id === undefined) {
       type = '';
    } else {
       type = this.formSearch.value.type.id;
    }
    this.peopleService.search(name, type).subscribe((next: People[]) => {
      this.peopleList = next;
      if (next.length === 0) {
        this.toast.error('List is empty');
      }
      this.formSearch = this.fb.group({
        nameS: ['', ],
        type: ['', ]
      });
    });
  }
}

// GET /posts?views_gte=10&views_lte=20
