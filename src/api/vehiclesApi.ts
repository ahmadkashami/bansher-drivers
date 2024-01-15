import { client } from "../plugins/AxiosConfig"
import { AppApiPath } from "./api.constatns"


export function getVehicle() {
    return new Promise((resolve, reject) => {
        client.get(AppApiPath.driverVehicles)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}
export function updateVehicleUnlink() {
    return new Promise((resolve, reject) => {
        client.post(`vehicles/unlink`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}
export function updateVehicleLink() {
    return new Promise((resolve, reject) => {
        client.post(`vehicles/link`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}


export function updateVehiclesLocation(location: object) {
    return new Promise((resolve, reject) => {
        client.put(`vehicles/location`, location)
            .then(response => resolve(response?.data))
            .catch(error => reject(error))
    })
}