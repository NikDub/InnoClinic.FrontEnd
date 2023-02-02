import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ErrorsRoutes } from './errors.routing';

@NgModule({
  declarations: [ForbiddenComponent],
  imports: [
    CommonModule,
    ErrorsRoutes
  ]
})
export class ErrorsModule { }
