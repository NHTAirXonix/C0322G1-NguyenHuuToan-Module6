import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BodyComponent} from './body.component';
import {InfoNewsComponent} from './info-news/info-news.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent
  }, {
    path: 'info-news/:id',
    component: InfoNewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule {
}
