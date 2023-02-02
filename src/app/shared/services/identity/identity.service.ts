import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { microserviceURI } from '../../MicroserviceURI';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  constructor(private httpClient: HttpClient) {}
  isAuth$ = new BehaviorSubject<boolean>(!!localStorage.getItem("accessToken"));
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
}
