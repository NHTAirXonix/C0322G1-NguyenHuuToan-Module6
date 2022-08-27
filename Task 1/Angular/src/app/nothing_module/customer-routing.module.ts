import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from './list/customer.component';
import {CustomerEditComponent} from './edit/customer-edit.component';

const routes: Routes = [
  {path: 'list', component: CustomerComponent},
  {path: 'edit/:id', component: CustomerEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
