import { client } from "../plugins/AxiosConfig";

export async function updateTruckStatus(truckId: number) {
  const response = await client.put(`trucks/${truckId}`);
  return response.data;
}
