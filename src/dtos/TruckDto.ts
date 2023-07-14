import {ILocation} from "../interfaces/LocationInterface";
import {ITruck} from "../interfaces/TruckInterface";


export class TruckDto {
    active: boolean;
    company_id: number;
    fieldwork: string;
    id: number;
    location: ILocation;
    status: boolean;
    user_id: number;
    constructor(truck: ITruck) {
        this.id = truck.id;
        this.user_id = truck.user_id;
        this.active = truck.active;
        this.location = { lat: truck.lat, long: truck.lang };
        this.company_id = truck.company_id;
        this.fieldwork = truck.fieldwork;
        this.status = truck.status;
    }
}
