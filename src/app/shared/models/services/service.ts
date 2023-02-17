import { Specialization } from "./specialization";

export interface Service {
  id:string,
  name:string,
  price:number,
  isActive:boolean,
  specialization: Specialization,
  category:{
    id:string,
    name:string
    timeSlotSize:number
  }
}
