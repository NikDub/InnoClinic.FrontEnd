import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { microservicePartPath, microserviceURI } from '../../MicroserviceURI';
import { DateWithTimeSlots } from '../../models/aggregation/DateWithTimeSlots';
import { DoctorForCreatedAggregated } from '../../models/aggregation/doctorForCreatedAggregated';
import { InfoForCreateAppointment } from '../../models/aggregation/InfoForCreateAppointment';

@Injectable({
  providedIn: 'root'
})
export class AggregatorsService {

constructor(private httpClient: HttpClient) { }

CreateDoctor(model:DoctorForCreatedAggregated){
  return this.httpClient.post(microserviceURI.gatewayUri+ '/Doctor', model);
}

getInfoForCreateAppointment():Observable<InfoForCreateAppointment>{
  return this.httpClient.get<InfoForCreateAppointment>(microserviceURI.gatewayUri + microservicePartPath.InfoForCreateAppointment);
}

getTimeSlots(doctorId: string):Observable<Array<DateWithTimeSlots>>{
  return this.httpClient.get<Array<DateWithTimeSlots>>(microserviceURI.gatewayUri + `${microservicePartPath.serviceAppointment}/TimeSlots/` + doctorId)
}

}
