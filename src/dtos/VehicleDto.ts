import {IUser} from "../interfaces/UserInterface";
import {geolocation, geoMetryLocation, IVehicle} from "../interfaces/VehicleInterface";

export class VehicleDto {
  _id: string;
  drivers: string[];
  services: string[];
  currentDriver: string;
  branchId:string;
  companyId: string;
  status: string;
  workStatus: string;
  lastActiveDate: string;
  geoLocation: geolocation;
  geoMetry:geoMetryLocation;
  appCode: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  constructor(vehicle: IVehicle) {
    this._id= vehicle._id;
    this.drivers= vehicle.drivers;
    this.services= vehicle.services;
    this.currentDriver= vehicle.currentDriver;
    this.branchId=vehicle.branchId;
    this.companyId= vehicle.companyId;
    this.status= vehicle.status;
    this.workStatus= vehicle.workStatus;
    this.lastActiveDate= vehicle.lastActiveDate;
    this.geoLocation= vehicle.geoLocation;
    this.geoMetry=vehicle.geoMetry;
    this.appCode= vehicle.appCode;
    this.createdAt= vehicle.createdAt;
    this.updatedAt= vehicle.updatedAt;
    this.__v= vehicle.__v;
    this.id= vehicle.id;
  }
}



