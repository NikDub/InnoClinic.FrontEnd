import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { microservicePartPath, microserviceURI } from '../../MicroserviceURI';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get(microserviceURI.servicesUri + microservicePartPath.serviceServices);
  }

  getByCategory() {
    return this.httpClient.get(microserviceURI.servicesUri + microservicePartPath.serviceServices + '/all');
  }

  getById(id: string) {
    return this.httpClient.get(microserviceURI.servicesUri + microservicePartPath.serviceServices + '/' + id);
  }

  create(body: any) {
    return this.httpClient.post(microserviceURI.servicesUri + microservicePartPath.serviceServices, body);
  }

  update(id: string, body: any) {
    return this.httpClient.put(microserviceURI.servicesUri + microservicePartPath.serviceServices + '/' + id, body);
  }

  changeStatus(id: string, isActive: boolean) {
    return this.httpClient.put(microserviceURI.servicesUri + microservicePartPath.serviceServices + '/' + id + "/status/" + isActive, null);
  }
}
