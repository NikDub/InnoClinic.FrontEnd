import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { microservicePartPath, microserviceURI } from '../../MicroserviceURI';
import { Patient } from '../../models/patient/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private httpClient: HttpClient) {}

  getPatientProfile():Observable<Patient> {
    return this.httpClient.get<Patient>(microserviceURI.gatewayUri + microservicePartPath.porfilePatients+"/profile");
  }
}
