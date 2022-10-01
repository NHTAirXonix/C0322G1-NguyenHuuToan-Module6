import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PigstyRoutingModule} from './pigsty-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PigstyCreateComponent} from './pigsty-create/pigsty-create.component';
import {PigstyEditComponent} from './pigsty-edit/pigsty-edit.component';
import {PigstyListComponent} from './pigsty-list/pigsty-list.component';


@NgModule({
  declarations: [
    PigstyListComponent,
    PigstyCreateComponent,
    PigstyEditComponent
  ],
  imports: [
    CommonModule,
    PigstyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PigstyModule {
}
