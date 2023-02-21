import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from './modules/layout/layout.module';
import { HomeModule } from './modules/home/home.module';
import { ErrorsModule } from './modules/error-pages/errors.module';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ServicesModule } from './modules/services/services.module';
import { MapModule } from './shared/modules/map/map.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { LoaderModule } from './shared/modules/loader/loader.module';
import { TimePickerCustomModule } from './shared/modules/timePickerCustom/timePickerCustom.module';
import { PatientsModule } from './modules/patients/patients.module';
import { DialogModule } from './shared/modules/dialog/dialog.module';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  exports: [MatSidenavModule, MatToolbarModule, MatDatepickerModule, MatNativeDateModule, LoaderModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    LayoutModule,
    HomeModule,
    ErrorsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ServicesModule,
    MapModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    SchedulesModule,
    LoaderModule,
    TimePickerCustomModule,
    PatientsModule,
    DialogModule
  ]
})
export class AppModule {}
