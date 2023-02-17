import { Time } from '@angular/common';
import { Appointments } from '../appointments/appointments';
import { Office } from '../offices/Office';

export interface AppointmentWithPatientPhoneAndOffice extends Appointments {
  accountPhoneNumber: string;
  office: Office;
}
