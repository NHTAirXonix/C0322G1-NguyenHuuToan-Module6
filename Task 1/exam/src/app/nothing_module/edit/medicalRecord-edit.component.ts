import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {PatientService} from '../service/patient.service';
import {MedicalRecordService} from '../service/medicalRecord.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './medicalRecord-edit.component.html',
  styleUrls: ['./medicalRecord-edit.component.css']
})
export class MedicalRecordEditComponent implements OnInit {

  id: number;

  formEdit = this.fb.group({
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
      this.formEdit.patchValue(value);
      }
    );
    this.id = id;
  }

  updateProduct(id: number) {
    const medicalRecord = this.formEdit.value;
    this.peopleService.update(id, medicalRecord).subscribe(() => {
      this.router.navigate(['/component/list']);
      this.toast.success('Update success !');
    });
  }
}

// function customerName(formControl: FormControl) {
//   if (formControl.value === '') {
//     return {name: true, message: 'Name is required'};
//   } else if (!formControl.value.match('^[A-Z](?:\'[A-Z])*[a-z]+(?: [A-Z](?:\'[A-Z])*[a-z]+)*$')) {
//     return {name: true, message: 'Wrong Format'};
//   } else {
//     return null;
//   }
// }

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

