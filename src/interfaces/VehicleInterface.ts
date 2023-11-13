import {ILocation} from "./LocationInterface";


export type geoMetryLocation={
    type: string,
    coordinates:number[],
    _id: string
}
export type geolocation ={
    latitude: number,
        longitude: number,
        _id: string
}

export interface IVehicle{
    _id: string,
    drivers: string[],
    services: string[],
    currentDriver: string,
    branchId:string,
    companyId: string,
    status: string,
    workStatus: string,
    lastActiveDate: string,
    geoLocation?: undefined,
    geoMetry?:undefined,
    appCode: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    id: string
}