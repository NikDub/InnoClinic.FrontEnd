import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { DoctorsListComponent } from './components/doctorsList/doctorsList.component';

const routes: Routes = [
  { path: 'list', component: DoctorsListComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutes {}
