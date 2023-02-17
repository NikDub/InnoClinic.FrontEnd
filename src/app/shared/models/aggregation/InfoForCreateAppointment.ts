import { Doctor } from '../doctors/doctor';
import { Office } from '../offices/Office';
import { Service } from '../services/service';
import { Specialization } from '../services/specialization';

export interface InfoForCreateAppointment {
  DoctorsAtWork: Array<Doctor>;
  Offices: Array<Office>;
  Services: Array<Service>;
  Specializations: Array<Specialization>;
}
