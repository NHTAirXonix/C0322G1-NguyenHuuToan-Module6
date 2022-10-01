import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StorageRoutingModule} from './storage-routing.module';
import {StorageListComponent} from './storage-list/storage-list.component';
import {StorageCreateComponent} from './storage-create/storage-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    StorageListComponent,
    StorageCreateComponent
  ],
  imports: [
    CommonModule,
    StorageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class StorageModule {
}
