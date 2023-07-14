import {TruckDto} from "./TruckDto";
import {IUser} from "../interfaces/UserInterface";

export class UserDto {
  id: number;
  name: string;
  email: string;
  truck: TruckDto;
  phone: string;
  constructor(user: IUser) {
    this.phone = user.phone;
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.truck = new TruckDto(user.truck);
  }
}



