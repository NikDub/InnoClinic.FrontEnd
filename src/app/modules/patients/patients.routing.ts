import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProfilePatientComponent } from './components/createProfilePatient/createProfilePatient.component';

const routes: Routes = [
  { path:"create", component:CreateProfilePatientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutes {}
