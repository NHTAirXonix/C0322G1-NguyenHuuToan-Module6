import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExportRoutingModule} from './export-routing.module';
import {ExportCreateComponent} from './export-create/export-create.component';
import {ExportUpdateComponent} from './export-update/export-update.component';
import {ExportListComponent} from './export-list/export-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ExportCreateComponent,
    ExportUpdateComponent,
    ExportListComponent
  ],
  imports: [
    CommonModule,
    ExportRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ExportModule {
}
