import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PigCreateComponent} from './pig-create/pig-create.component';
import {PigUpdateComponent} from './pig-update/pig-update.component';
import {PigListComponent} from './pig-list/pig-list.component';
import {AuthGuard} from '../security/auth.guard.';

const routes: Routes = [
  {
    path: 'pig',
    component: PigListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'pig/create',
    component: PigCreateComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'pig/update/:id',
    component: PigUpdateComponent,
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
export class PigRoutingModule {
}
