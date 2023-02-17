import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleRoutes } from './schedule.routing';
import { ReceptionistScheduleComponent } from './receptionistSchedule/receptionistSchedule.component';
import { LoaderModule } from '../../shared/modules/loader/loader.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DoctorScheduleComponent } from './doctorSchedule/doctorSchedule.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { CreateAppointmentComponent } from './createAppointment/createAppointment.component';

@NgModule({
  declarations: [ReceptionistScheduleComponent, DoctorScheduleComponent, CreateAppointmentComponent],
  imports: [
    CommonModule,
    ScheduleRoutes,
    LoaderModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSortModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSelectModule
  ]
})
export class SchedulesModule {}
