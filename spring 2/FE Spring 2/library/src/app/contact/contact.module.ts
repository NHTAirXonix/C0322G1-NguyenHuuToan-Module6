import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactRoutingModule} from './contact-routing.module';
import {ContactListComponent} from './contact-list/contact-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContactCreateComponent } from './contact-create/contact-create.component';

@NgModule({
  declarations: [
    ContactListComponent,
    ContactCreateComponent
  ],
  exports: [
    ContactCreateComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule,
    ReactiveFormsModule]
})
export class ContactModule {
}
