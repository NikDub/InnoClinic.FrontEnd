import { Data } from "@angular/router";
import { Office } from "../offices/Office";
import { Specialization } from "../services/specialization";

export interface DoctorsWithPhotoAndOffice {
  accountId:string;
  accountPhoneNumber:string;
  careerStartYear:number;
  dateOfBirth: Data;
  firstName: string;
  middleName: string;
  id:string;
  lastName:string;
  photoId:string;
  photoUrl:string;
  office:Office;
  specialization:Specialization;
}
