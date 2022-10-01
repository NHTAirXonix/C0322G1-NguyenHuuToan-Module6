import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TreatmentListComponent} from './treatment-list/treatment-list.component';
import {TreatmentCreateComponent} from './treatment-create/treatment-create.component';
import {AuthGuard} from '../security/auth.guard.';

const routes: Routes = [
  {
    path: 'treatment',
    component: TreatmentListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }, {
    path: 'treatment/create',
    component: TreatmentCreateComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentRoutingModule { }
