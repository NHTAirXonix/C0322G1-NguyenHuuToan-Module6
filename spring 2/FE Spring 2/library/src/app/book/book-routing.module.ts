import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BookComponent} from "./book/book.component";

const routes: Routes = [
 {
    path: 'bookDetail/:id',
    component: BookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
