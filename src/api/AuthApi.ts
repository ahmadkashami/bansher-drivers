import { client } from "../plugins/AxiosConfig";

export async function login(email: string, password: string) {
  const payload = { email, password };
  const response = await client.post("auth/login", payload);
  return response.data;
}




export function updateDriverStatus(status:string) {
  return new Promise((resolve, reject) => {
    client.put(`drivers/profile`,{status:status})
        .then(response => resolve(response))
        .catch(error => reject(error))
  })
}


export function getVehicle() {
  return new Promise((resolve, reject) => {
    client.get(`vehicles/owner`)
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