import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home' ,   loadChildren: () => import('./modules/home/home.module').then(m=>m.HomeModule)},
  { path: 'services' ,   loadChildren: () => import('./modules/services/services.module').then(m=>m.ServicesModule)},
  { path: 'schedule' ,   loadChildren: () => import('./modules/schedules/schedules.module').then(m=>m.SchedulesModule)},
  { path: 'auth' , loadChildren: () => import('./modules/auth/auth.module').then(m=>m.AuthModule) },
  { path: 'doctors' , loadChildren: () => import('./modules/doctors/doctors.module').then(m=>m.DoctorsModule) },
  { path: 'patients' , loadChildren: () => import('./modules/patients/patients.module').then(m=>m.PatientsModule) },
  { path: 'panel' , loadChildren: () => import('./modules/panel/panel.module').then(m=>m.PanelModule) },
  { path: 'error' , loadChildren: () => import('./modules/error-pages/errors.module').then(m=>m.ErrorsModule) },
  { path: '**' , redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
