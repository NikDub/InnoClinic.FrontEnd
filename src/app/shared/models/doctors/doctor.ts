import { Specialization } from '../services/specialization';
import { Status } from './status';

export interface Doctor {
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: Date;
  careerStartYear: number;
  accountPhoneNumber: string;
  officeId: string;
  status: Status;
  specialization: Specialization;
}
