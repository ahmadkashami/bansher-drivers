import { client } from "./axios.config";

export async function login(phone: string, password: string) {
  const payload = { phone, password };
  console.log({ payload });

  const reponse = await client.post("login", payload);
  return reponse.data;
}
