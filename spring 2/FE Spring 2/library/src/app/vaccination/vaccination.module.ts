import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VaccinationRoutingModule} from './vaccination-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VaccinationCreateComponent} from './vaccination-create/vaccination-create.component';
import {HttpClientModule} from '@angular/common/http';
import {VaccinationListComponent} from './vaccination-list/vaccination-list.component';

@NgModule({
  declarations: [
    VaccinationCreateComponent,
    VaccinationListComponent
  ],
  imports: [
    CommonModule,
    VaccinationRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class VaccinationModule { }
