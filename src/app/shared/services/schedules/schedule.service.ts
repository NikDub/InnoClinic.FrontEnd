import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { microservicePartPath, microserviceURI } from '../../MicroserviceURI';
import { AppointmentWithPatientPhoneAndOffice } from '../../models/aggregation/AppointmentWithPatientPhoneAndOffice';
import { Appointments } from '../../models/appointments/appointments';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private httpClient: HttpClient) {}

  getScheduleViewByReceptionist(): Observable<Array<AppointmentWithPatientPhoneAndOffice>> {
    return this.httpClient.get<Array<AppointmentWithPatientPhoneAndOffice>>(
      microserviceURI.gatewayUri + microservicePartPath.serviceAppointment + '/Schedule'
    );
  }

  getScheduleViewByDoctor(id: string): Observable<Array<Appointments>> {
    return this.httpClient.get<Array<Appointments>>(
      microserviceURI.gatewayUri + microservicePartPath.serviceAppointment + `/Doctor/${id}`
    );
  }

  approveAppointment(id: string) {
    return this.httpClient.put(microserviceURI.gatewayUri + microservicePartPath.serviceAppointment + `/${id}`, null);
  }

  canceledAppointment(id: string) {
    return this.httpClient.delete(microserviceURI.gatewayUri + microservicePartPath.serviceAppointment + `/${id}`);
  }

  createAppointment(appointment: Appointments) {
    return this.httpClient.post(microserviceURI.gatewayUri+ microservicePartPath.serviceAppointment, appointment);
  }
}
