import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MedicalRecordListComponent} from './list/medicalRecord-list.component';
import {MedicalRecordEditComponent} from './edit/medicalRecord-edit.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, AbstractControl, Validators, FormsModule} from '@angular/forms';
import {CustomerRoutingModule} from './customer-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { MedicalRecordCreateComponent } from './create/medicalRecord-create.component';
import { StatictisComponent } from './statictis/statictis.component';

@NgModule({
  declarations: [MedicalRecordListComponent,
    MedicalRecordEditComponent,
    MedicalRecordCreateComponent,
    StatictisComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
  ]
})
export class CustomerModule { }
