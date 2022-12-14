import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatisticComponent} from './statistic/statistic.component';
import {AuthGuard} from '../security/auth.guard.';

const routes: Routes = [
  {
    path: 'statistic',
    component: StatisticComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
