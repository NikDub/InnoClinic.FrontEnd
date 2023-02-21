import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailConfirmationComponent } from './components/emailConfirmation/emailConfirmation.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

const routes: Routes = [
  {  path: "forbidden", component: ForbiddenComponent },
  {  path: "confirmEmail", component: EmailConfirmationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutes{};
