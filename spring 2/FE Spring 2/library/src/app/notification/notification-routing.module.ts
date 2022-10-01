import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {NotificationCreateComponent} from './notification-create/notification-create.component';
import {NotificationEditComponent} from './notification-edit/notification-edit.component';
import {AuthGuard} from '../security/auth.guard.';

const routes: Routes = [
  {
    path: 'notification/list',
    component: NotificationListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }, {
    path: 'notification/create',
    component: NotificationCreateComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }, {
    path: 'notification/edit/:id',
    component: NotificationEditComponent,
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
export class NotificationRoutingModule {
}
