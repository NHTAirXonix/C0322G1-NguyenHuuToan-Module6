import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PigRoutingModule } from './pig-routing.module';
import { PigCreateComponent } from './pig-create/pig-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PigUpdateComponent } from './pig-update/pig-update.component';
import {PigListComponent} from './pig-list/pig-list.component';

@NgModule({
  declarations: [PigCreateComponent, PigUpdateComponent, PigListComponent],
  imports: [
    CommonModule,
    PigRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PigModule { }
