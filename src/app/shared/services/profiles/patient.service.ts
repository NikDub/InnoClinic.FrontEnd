import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { microservicePartPath, microserviceURI } from '../../MicroserviceURI';
import { PatientForCreatedAggregated } from '../../models/aggregation/patientForCreatedAggregated';
import { Patient } from '../../models/patient/patient';
import { PatientForMatch } from '../../models/patient/patientForMatch';
import { PatientForUpdate } from '../../models/patient/patientForUpdate';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private httpClient: HttpClient) {}

  getPatientProfile():Observable<Patient> {
    return this.httpClient.get<Patient>(microserviceURI.gatewayUri + microservicePartPath.porfilePatients+"/profile");
  }

  checkPatientProfile(patient: PatientForMatch): Observable<Patient> {
    return this.httpClient.post<Patient>(`${microserviceURI.gatewayUri + microservicePartPath.porfilePatients}/profile/check`, patient);
  }

  createPatientProfile(patient: PatientForCreatedAggregated): Observable<any>{
    return this.httpClient.post<any>(microserviceURI.gatewayUri + microservicePartPath.porfilePatients+"/profile", patient);
  }

  updatePatientProfile(id:string, model:PatientForUpdate): Observable<any>{
    return this.httpClient.put<any>(`${microserviceURI.gatewayUri + microservicePartPath.porfilePatients}/profile/${id}`, model);
  }
}
