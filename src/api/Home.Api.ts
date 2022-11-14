import { client } from "./axios.config";

export async function updateTruckStatus(truckId: number) {
  const response = await client.put(`trucks/${truckId}`);
  return response.data;
}
