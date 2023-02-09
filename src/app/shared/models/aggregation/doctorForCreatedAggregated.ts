import { Status } from '../doctors/status';
import { Photo } from '../PhotoDocument/photo';

export interface DoctorForCreatedAggregated {
  FirstName: string;
  LastName: string;
  MiddleName: string;
  DateOfBirth: Date;
  CareerStartYear: number;
  SpecializationId: string;
  Status: Status;
  OfficeId: string;
  Email: string;
  Photo?: Photo;
}
