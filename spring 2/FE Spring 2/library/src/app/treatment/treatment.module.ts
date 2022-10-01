import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreatmentRoutingModule } from './treatment-routing.module';
import {TreatmentListComponent} from './treatment-list/treatment-list.component';
import {TreatmentCreateComponent} from './treatment-create/treatment-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TreatmentListComponent,
    TreatmentCreateComponent
  ],
  imports: [
    CommonModule,
    TreatmentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TreatmentModule { }
