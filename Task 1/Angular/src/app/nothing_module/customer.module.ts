import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerComponent} from './list/customer.component';
import {CustomerEditComponent} from './edit/customer-edit.component';

import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, AbstractControl, Validators, FormsModule} from '@angular/forms';
import {CustomerRoutingModule} from './customer-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [CustomerComponent, CustomerEditComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class CustomerModule { }
