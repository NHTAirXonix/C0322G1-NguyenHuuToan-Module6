import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {CardService} from '../service/card.service';
import {PeopleService} from '../service/people.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {log} from 'util';
import {CardMedical} from '../model/card-medical';
import {ok} from 'assert';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  formEdit = this.fb.group({
    id: ['', Validators.required],
    code: ['', Validators.required],
    name: ['', customerName],
    day: this.fb.group({
      dayStart: ['', Validators.required],
      dayEnd: ['', Validators.required],
    }, {validators: endDateValidator}),
    reason: ['', Validators.required],
    resovers: ['', Validators.required],
    doctor: ['', Validators.required],
    cardMedical: ['', [Validators.required]],
  });
  id: number;
  cardList: CardMedical[] = [];
  outPut: any;

  constructor(private cardService: CardService,
              private  fb: FormBuilder,
              private peopleService: PeopleService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toast: ToastrService) {
    this.getAll();
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getPeople(this.id);
    });
  }

  ngOnInit(): void {
  }

  getAll() {
    this.cardService.getAll().subscribe((next: CardMedical[]) => {
      this.cardList = next;
    });
  }

  getPeople(id: number) {
    return this.peopleService.findById(id).subscribe(people => {
      console.log(people);
      this.formEdit = this.fb.group({
        id: [people.id, Validators.required],
        code: [people.code, Validators.required],
        name: [people.name, customerName],
        day: this.fb.group({
        dayStart: [people.dayStart, Validators.required],
        dayEnd: [people.dayEnd, Validators.required],
        }, {validators: endDateValidator}),
        reason: [people.reason, Validators.required],
        resovers: [people.resovers, Validators.required],
        doctor: [people.doctor, Validators.required],
        cardMedical: [people.cardMedical, [Validators.required]],
      });
      for (const item of this.cardList) {
        console.log(item.id);
        console.log(this.formEdit.value.cardMedical.id);
        if (item.id === this.formEdit.value.cardMedical.id) {
          this.formEdit.patchValue({cardMedical: item});
          console.log('ok');
        }
      }
    });
  }

  updateProduct(id: number) {
    const people = this.formEdit.value;
    people.dayStart = this.formEdit.value.day.dayStart;
    people.dayEnd = this.formEdit.value.day.dayEnd;
    this.peopleService.update(id, people).subscribe(() => {
      this.router.navigate(['/component/list']);
      this.toast.success('Create Customer success !');
    });
  }
}

function customerName(formControl: FormControl) {
  if (formControl.value === '') {
    return {name: true, message: 'Name is required'};
  } else if (!formControl.value.match('^[A-Z](?:\'[A-Z])*[a-z]+(?: [A-Z](?:\'[A-Z])*[a-z]+)*$')) {
    return {name: true, message: 'Wrong Format'};
  } else {
    return null;
  }
}

export function endDateValidator(form: AbstractControl) {
  if (form.value.dayStart === '' || form.value.dayEnd === '') {
    console.log();
    return {daynomatch: true, message: 'No Empty'};
  }
  const startDate = new Date(form.value.dayStart);
  const endDate = new Date(form.value.dayEnd);
  return (endDate.getTime() > startDate.getTime() ) ? null : {
    daynomatch: true, message: 'Wrong format'
  };
}

