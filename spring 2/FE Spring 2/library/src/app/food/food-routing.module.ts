import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FoodCreateComponent} from './food-create/food-create.component';
import {FoodEditComponent} from './food-edit/food-edit.component';
import {FoodListComponent} from './food-list/food-list.component';
import {AuthGuard} from '../security/auth.guard.';

const routes: Routes = [
  {
    path: 'food',
    component: FoodListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'food/create',
    component: FoodCreateComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }, {
    path: 'food/edit/:id',
    component: FoodEditComponent,
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
export class FoodRoutingModule {
}
