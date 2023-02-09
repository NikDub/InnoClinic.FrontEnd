import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { microservicePartPath, microserviceURI } from '../../MicroserviceURI';

@Injectable({
  providedIn: 'root'
})
export class SpecializationsService {

  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get(microserviceURI.servicesUri + microservicePartPath.serviceSpecializations);
  }

}
