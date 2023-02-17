import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { microservicePartPath, microserviceURI } from '../../MicroserviceURI';
import { Doctor } from '../../models/doctors/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  constructor(private httpClient: HttpClient) {}

  getDoctorsWithPhotoUrlAndOffice() {
    return this.httpClient.get(microserviceURI.gatewayUri + '/DoctorsWithPhoto');
  }

  getDoctor(id: string): Observable<Doctor> {
    return this.httpClient.get<Doctor>(microserviceURI.gatewayUri + microservicePartPath.porfileDoctors + `/${id}`);
  }
}
