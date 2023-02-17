import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { SignInComponent } from 'src/app/modules/auth/components/SignIn/SignIn.component';
import { SignUpComponent } from 'src/app/modules/auth/components/SignUp/SignUp.component';
import { Roles } from '../../enums/roles';
import { microserviceURI } from '../../MicroserviceURI';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  helper = new JwtHelperService();
  isAuth$ = new BehaviorSubject<boolean>(!!localStorage.getItem('accessToken'));
  roles$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  id$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {
    if (localStorage.getItem('accessToken') != null)
    {
      const token = this.helper.decodeToken(localStorage.getItem('accessToken'));
      this.roles$ = new BehaviorSubject<string>(token.roles);
      this.id$ = new BehaviorSubject<string>(token.sub);
    }
  }

  SignIn(data: any) {
    let form = {
      Email: data['email'],
      Password: data['password']
    };
    return this.httpClient.post(microserviceURI.identityUri + '/Auth/Login', form);
  }

  SignUp(data: any) {
    let form = {
      Email: data['email'],
      Password: data['password'],
      ConfirmPassword: data['confirmPassword']
    };
    return this.httpClient.post(microserviceURI.identityUri + '/Auth/SignUp', form);
  }

  SignOut() {
    return this.httpClient.get(microserviceURI.identityUri + '/Auth/SingOut');
  }

  ChangeRole(userId: string, role: any) {
    return this.httpClient.post(microserviceURI.identityUri + '/Auth/ChangeRole/' + userId, role);
  }

  isEmailExists(email: string) {
    return this.httpClient.get(microserviceURI.identityUri + '/Auth/IsEmailExists?email=' + email);
  }

  openSignInDialog() {
    this.dialog.closeAll();
    this.dialog.open(SignInComponent, {
      height: '265px',
      width: '500px'
    });
  }

  openSignUpDialog() {
    this.dialog.closeAll();
    this.dialog.open(SignUpComponent, {
      height: '365px',
      width: '500px'
    });
  }

  isReceptionost() {
    return this.roles$.value == Roles.Receptionist;
  }

  isDoctor() {
    return this.roles$.value == Roles.Doctor;
  }

  isPatient() {
    return this.roles$.value == Roles.Patient;
  }
}
