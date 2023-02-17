import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Roles } from 'src/app/shared/enums/roles';
import { DoctorScheduleComponent } from './doctorSchedule/doctorSchedule.component';
import { ReceptionistScheduleComponent } from './receptionistSchedule/receptionistSchedule.component';

const routes: Routes = [
  { path: 'receptionist', component: ReceptionistScheduleComponent, canActivate: [AuthGuard], data: { Roles: [Roles.Receptionist] } },
  { path: 'doctor', component: DoctorScheduleComponent, canActivate: [AuthGuard], data: { Roles: [Roles.Doctor] } },
  { path: '**', redirectTo: 'receptionist' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutes {}
