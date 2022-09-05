import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {PatientService} from '../service/patient.service';
import {MedicalRecordService} from '../service/medicalRecord.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './medicalRecord-create.component.html',
  styleUrls: ['./medicalRecord-create.component.css']
})
export class MedicalRecordCreateComponent implements OnInit {

  id: number;

  formCreate = this.fb.group({
    medicalId: ['', Validators.required],
    medicalCode: ['', Validators.required],
    patient: this.fb.group({
      patientId: ['', Validators.required],
      patientCode: ['', Validators.required],
      patientName: ['', Validators.required],
    }, ),
    dayStart: ['', Validators.required],
    dayEnd: ['', Validators.required],
    reason: ['', Validators.required],
    resolve: ['', Validators.required],
    deleteStatus: ['', [Validators.required]],
    doctor: ['', Validators.required],
  }, {validators: endDateValidator});


  constructor(private cardService: PatientService,
              private  fb: FormBuilder,
              private peopleService: MedicalRecordService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params.id);
    this.peopleService.findById(id).subscribe( value => {
        console.log(value);
        this.formCreate.patchValue(value);
      }
    );
    this.id = id;
  }

  create(id: number) {
    const medicalRecord = this.formCreate.value;
    this.peopleService.create(id, medicalRecord).subscribe(() => {
      this.router.navigate(['/component/list']);
      this.toast.success('Create success !');
    });
  }
}

export function endDateValidator(form: AbstractControl) {
  if (form.value.dayStart === '' || form.value.dayEnd === '') {
    console.log();
    return {daynomatch: true, message: 'No Empty'};
  }
  const startDate = new Date(form.value.dayStart);
  const endDate = new Date(form.value.dayEnd);
  return (endDate.getTime() > startDate.getTime()) ? null : {
    daynomatch: true, message: 'Wrong format'
  };
}
