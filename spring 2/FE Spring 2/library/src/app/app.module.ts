import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BodyModule} from './body/body.module';
import {VaccinationModule} from './vaccination/vaccination.module';
import {DatePipe} from '@angular/common';
import {StorageModule} from './storage/storage.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {StatisticModule} from './statistic/statistic.module';
import {TreatmentModule} from './treatment/treatment.module';
import {NotificationModule} from './notification/notification.module';
import {EmployeeModule} from './employee/employee.module';
import {ContactModule} from './contact/contact.module';
import {PigModule} from './pig/pig.module';
import {PigstyModule} from './pigsty/pigsty.module';
import {AdvertisementModule} from './advertisement/advertisement.module';
import {FoodModule} from './food/food.module';
import {SecurityModule} from './security/security.module';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {ExportModule} from './exprot/export.module';
import {BookModule} from "./book/book.module";
import {CartModule} from "./cart/cart.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    VaccinationModule,
    StorageModule,
    BodyModule,
    TreatmentModule,
    StatisticModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    TreatmentModule,
    NotificationModule,
    EmployeeModule,
    ContactModule,
    PigModule,
    PigstyModule,
    AdvertisementModule,
    FoodModule,
    SecurityModule,
    CKEditorModule,
    ExportModule,
    BookModule,
    CartModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
