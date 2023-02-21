import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './components/SignIn/SignIn.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SignUpComponent } from './components/SignUp/SignUp.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthRoutes } from './auth.routing';
import { EmailConfirmComponent } from './components/emailConfirm/emailConfirm.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, EmailConfirmComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    AuthRoutes,
  ]
})
export class AuthModule {}
