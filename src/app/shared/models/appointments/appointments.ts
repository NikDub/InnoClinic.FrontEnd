import { Time } from "@angular/common";

export interface Appointments {
  id?: string;
  patientId: string;
  doctorId: string;
  serviceId: string;
  date: Date;
  time: Time;
  duration: number;
  status: boolean;
  serviceName: string;
  doctorFirstName: string;
  doctorLastName: string;
  doctorMiddleName: string;
  patientFirstName: string;
  patientLastName: string;
  patientMiddleName: string;
}
