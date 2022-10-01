import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdvertisementComponent} from './advertisement-list/advertisement.component';
import {AdvertisementPostComponent} from './advertisement-post/advertisement-post.component';
import {AdvertisementEditComponent} from './advertisement-edit/advertisement-edit.component';
import {AuthGuard} from '../security/auth.guard.';

const routes: Routes = [
  {
    path: 'advertisement/page',
    component: AdvertisementComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }, {
    path: 'advertisement/post',
    component: AdvertisementPostComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }, {
    path: 'advertisement/edit/:id',
    component: AdvertisementEditComponent,
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

export class AdvertisementRoutingModule {
}


