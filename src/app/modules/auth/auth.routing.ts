import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/SignIn/SignIn.component'
import { SignUpComponent } from './components/SignUp/SignUp.component';

const routes: Routes = [
  { path: 'signin' , component: SignInComponent},
  { path: 'signup' , component: SignUpComponent},
  { path: '**' , redirectTo: 'signin' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutes{};
