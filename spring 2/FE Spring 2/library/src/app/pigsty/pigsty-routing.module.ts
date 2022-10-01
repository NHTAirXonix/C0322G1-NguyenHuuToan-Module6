import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PigstyCreateComponent} from './pigsty-create/pigsty-create.component';
import {PigstyEditComponent} from './pigsty-edit/pigsty-edit.component';
import {PigstyListComponent} from './pigsty-list/pigsty-list.component';
import {AuthGuard} from '../security/auth.guard.';


const routes: Routes = [
  {
    path: 'pigsty/list',
    component: PigstyListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'pigsty/create',
    component: PigstyCreateComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'pigsty/edit/:id',
    component: PigstyEditComponent,
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
export class PigstyRoutingModule { }
