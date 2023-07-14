import {ITruck} from "./TruckInterface";

export interface IUser {
  id: number;
  company_id?: number;
  email: string;
  name: string;
  phone: string;
  truck: ITruck;
}

