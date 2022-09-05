import {Component, OnInit, Input} from '@angular/core';
import {MedicalRecordService} from '../service/medicalRecord.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {PatientService} from '../service/patient.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MedicalRecord} from '../model/medical-record';
import {Patient} from '../model/patient';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-customer',
  templateUrl: './medicalRecord-list.component.html',
  styleUrls: ['./medicalRecord-list.component.css']
})

export class MedicalRecordListComponent implements OnInit {

  medicalRecords: MedicalRecord[] = [];
  patients: Patient[] = [];

  idPeople: any = '';
  namePeople: any = '';
  displayStyle = 'none';
  idDelete: any;
  p = 1;

  formSearch = this.fb.group({
    nameS: ['', ],
    type: ['', ]
  });

  constructor(private peopleService: MedicalRecordService,
              private cardService: PatientService,
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
    this.medicalRecords = this.peopleService.getAll().subscribe ((next: MedicalRecord[]) => {
      this.medicalRecords = next; },
      // tslint:disable-next-line:no-shadowed-variable
        error => { console.log(error); });
    this.cardService.getAll().subscribe((next: Patient[]) => {
      this.patients = next;
    });
  }

  callService() {
    this.peopleService.delete(this.idDelete).subscribe(() => {
      this.getAll();
      this.closePopup();
      this.toast.success('Delete Success !');
    });
  }

  search() {
    // const name = this.formSearch.value.nameS;
    // let type = '';
    // console.log(name + ' xxxxxxx ' + type);
    // if (this.formSearch.value.type.id === undefined) {
    //    type = '';
    // } else {
    //    type = this.formSearch.value.type.id;
    // }
    // this.peopleService.search(name, type).subscribe((next: MedicalRecord[]) => {
    //   this.medicalRecords = next;
    //   if (next.length === 0) {
    //     this.toast.error('List is empty');
    //   }
    //   this.formSearch = this.fb.group({
    //     nameS: ['', ],
    //     type: ['', ]
    //   });
    // });
    const name = this.formSearch.value.nameS;
    this.peopleService.search(name).subscribe((next: MedicalRecord[]) => {
      this.medicalRecords = next;
      if (next.length === 0) {
        this.toast.error('List is empty');
      }
      this.formSearch = this.fb.group({
        nameS: ['', ],
      });
    });
  }
}

// GET /posts?views_gte=10&views_lte=20
