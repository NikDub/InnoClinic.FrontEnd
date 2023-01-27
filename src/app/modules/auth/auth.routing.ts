import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/SignIn/SignIn.component'

const routes: Routes = [
  { path: 'signin' , component: SignInComponent},
  { path: '**' , redirectTo: 'signin' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutes{};
