import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExportCreateComponent} from './export-create/export-create.component';
import {ExportUpdateComponent} from './export-update/export-update.component';
import {ExportListComponent} from './export-list/export-list.component';
import {AuthGuard} from '../security/auth.guard.';


const routes: Routes = [
  {
    path: 'export/page',
    component: ExportListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'export/create',
    component: ExportCreateComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'export/update/:id',
    component: ExportUpdateComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportRoutingModule { }
