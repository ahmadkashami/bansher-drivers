import { client } from "../plugins/AxiosConfig";

export async function login(email: string, password: string) {
  const payload = { email, password };
  const response = await client.post("auth/login", payload);
  return response.data;
}

export async function updateUserStatus(status:string,location?:object) {
  const payload = { status,location };
  const response = await client.post(`drivers/status`,payload);
  return response.data;
}



export function getVehicle() {
  return new Promise((resolve, reject) => {
    client.get(`vehicles/owner`)
        .then(response => resolve(response))
        .catch(error => reject(error))
  })
}export function putVehicleUnlink() {
  return new Promise((resolve, reject) => {
    client.put(`vehicles/unlink`)
        .then(response => resolve(response))
        .catch(error => reject(error))
  })
}