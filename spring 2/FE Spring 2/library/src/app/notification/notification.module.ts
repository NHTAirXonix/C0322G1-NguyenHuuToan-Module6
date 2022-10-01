import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotificationRoutingModule} from './notification-routing.module';
import {NotificationCreateComponent} from './notification-create/notification-create.component';
import {NotificationEditComponent} from './notification-edit/notification-edit.component';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    NotificationCreateComponent,
    NotificationEditComponent,
    NotificationListComponent
  ],
    imports: [
        CommonModule,
        NotificationRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        CKEditorModule,
    ]
})
export class NotificationModule {
}
