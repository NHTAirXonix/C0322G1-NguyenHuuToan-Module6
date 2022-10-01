import {RouterModule, Routes} from '@angular/router';
import {VaccinationCreateComponent} from './vaccination-create/vaccination-create.component';
import {NgModule} from '@angular/core';
import {VaccinationListComponent} from './vaccination-list/vaccination-list.component';
import {AuthGuard} from '../security/auth.guard.';

const routes: Routes = [
  {
    path: 'vaccination',
    component: VaccinationListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'vaccination/create',
    component: VaccinationCreateComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class VaccinationRoutingModule { }
