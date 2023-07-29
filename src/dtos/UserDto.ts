import {IUser} from "../interfaces/UserInterface";

export class UserDto {
  _id: string;
  status:boolean;
  name:string;
  email:string;
  licenseExpiredAt:string;
  createdAt:string;
  phoneNum:string;
  branchId:string;
  companyId:string;
  vehicleId:string;
  photo:string;
  constructor(user: IUser) {
    this._id= user._id,
        this.status=user.status ,
        this.name= user.name,
        this.email= user.email,
        this.licenseExpiredAt=user.licenseExpiredAt ,
        this.createdAt=user.createdAt ,
        this.phoneNum= user.phoneNum,
        this.branchId= user.branchId,
        this.companyId=user.companyId,
        this.vehicleId=user.vehicleId,
        this.photo=user.photo
  }
}



