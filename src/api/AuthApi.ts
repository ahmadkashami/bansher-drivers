import { client } from "../plugins/AxiosConfig";

export async function login(email: string, password: string) {
  const payload = { email, password };
  const response = await client.post("auth/login", payload);
  return response.data;
}

export async function updateUserStatus(status:string,location?:object) {
  const response = await client.post(`drivers/status`,{status:status});
  return response.data;
}
