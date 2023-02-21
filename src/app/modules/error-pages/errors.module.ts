import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ErrorsRoutes } from './errors.routing';
import { EmailConfirmationComponent } from './components/emailConfirmation/emailConfirmation.component';

@NgModule({
  declarations: [ForbiddenComponent, EmailConfirmationComponent],
  imports: [
    CommonModule,
    ErrorsRoutes
  ]
})
export class ErrorsModule { }
