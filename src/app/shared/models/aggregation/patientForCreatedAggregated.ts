import { Photo } from "../PhotoDocument/photo";

export interface PatientForCreatedAggregated{
  accountId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: Date;
  accountPhoneNumber: string;
  photo:Photo
}
