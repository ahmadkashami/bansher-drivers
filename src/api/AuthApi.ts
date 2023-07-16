import { client } from "../plugins/AxiosConfig";

export async function login(email: string, password: string) {
  const payload = { email, password };
  const response = await client.post("login", payload);
  return response.data;
}
