import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { microserviceURI } from '../../MicroserviceURI';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private httpClient: HttpClient) {}

  getDoctorsWithPhotoUrlAndOffice(){
    return this.httpClient.get(microserviceURI.gatewayUri+"/gateway/DoctorsWithPhoto");
  }

}
