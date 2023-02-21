import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailConfirmComponent } from './components/emailConfirm/emailConfirm.component';

const routes: Routes = [
  { path:"emailconfirmation", component:EmailConfirmComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutes {}
