import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdvertisementRoutingModule} from './advertisement-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AdvertisementPostComponent} from './advertisement-post/advertisement-post.component';
import {AdvertisementEditComponent} from './advertisement-edit/advertisement-edit.component';
import {AdvertisementComponent} from './advertisement-list/advertisement.component';

@NgModule({
  declarations: [
    AdvertisementComponent,
    AdvertisementPostComponent,
    AdvertisementEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdvertisementRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdvertisementModule {
}
