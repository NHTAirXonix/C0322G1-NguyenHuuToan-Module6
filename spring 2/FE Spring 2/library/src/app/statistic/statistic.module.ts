import {CommonModule, DatePipe} from '@angular/common';
import {StatisticRoutingModule} from './statistic-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {StatisticComponent} from './statistic/statistic.component';

@NgModule({
  declarations: [ StatisticComponent],
  imports: [
    CommonModule,
    StatisticRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DatePipe],
})
export class StatisticModule { }
