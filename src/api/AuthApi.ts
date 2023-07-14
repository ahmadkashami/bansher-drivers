import { client } from "../plugins/AxiosConfig";

export async function login(phone: string, password: string) {
  const payload = { phone, password };
  const response = await client.post("login", payload);
  return response.data;
}
