export interface IUser {
  id: number;
  company_id?: number;
  email: string;
  name: string;
  phone: string;
  truck: ITruck;
}

export interface ITruck {
  active: boolean;
  company_id: number;
  fieldwork: string;
  id: number;
  lang: number;
  lat: number;
  status: boolean;
  user_id: number;
}

export interface ILocation {
  lat: number;
  long: number;
}
