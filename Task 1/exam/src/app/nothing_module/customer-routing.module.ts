import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MedicalRecordListComponent} from './list/medicalRecord-list.component';
import {MedicalRecordEditComponent} from './edit/medicalRecord-edit.component';
import {MedicalRecordCreateComponent} from './create/medicalRecord-create.component';

const routes: Routes = [
  {path: 'list', component: MedicalRecordListComponent},
  {path: 'edit/:id', component: MedicalRecordEditComponent},
  {path: 'create', component: MedicalRecordCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
