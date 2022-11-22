import { ILocation, ITruck, IUser } from "../interfaces/User.interface";

export class UserDto {
  id: number;
  name: string;
  email: string;
  truck: TruckDto;
  phone: string;
  constructor(user: IUser) {
    console.log({ user });

    this.phone = user.phone;
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.truck = new TruckDto(user.truck);
  }
}

export class TruckDto {
  active: boolean;
  company_id: number;
  fieldwork: string;
  id: number;
  location: Location;
  status: boolean;
  user_id: number;
  constructor(truck: ITruck) {
    this.id = truck.id;
    this.user_id = truck.user_id;
    this.active = truck.active;
    this.location = new Location(truck.lat, truck.lang);
    this.company_id = truck.company_id;
    this.fieldwork = truck.fieldwork;
    this.status = truck.status;
  }
}

export class Location {
  lat: number;
  long: number;
  constructor(lat: number, long: number) {
    this.lat = lat;
    this.long = long;
  }
}
