import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { microservicePartPath, microserviceURI } from '../../MicroserviceURI';
import { DoctorForCreatedAggregated } from '../../models/aggregation/doctorForCreatedAggregated';

@Injectable({
  providedIn: 'root'
})
export class AggregatorsService {

constructor(private httpClient: HttpClient) { }

CreateDoctor(model:DoctorForCreatedAggregated){
  return this.httpClient.post(microserviceURI.gatewayUri+ '/Doctor', model);
}

}
