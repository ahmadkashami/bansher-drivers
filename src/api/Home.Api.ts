import { client } from "./axios.config";

export async function updateTruckStatus(truckId: number) {
  const response = await client.put(`trucks/${truckId}`);
  return response.data;
}

export async function updateTruckLocation(
  id: number,
  location: { lat: number; lang: number }
) {
  const response = await client.put(`trucks/${id}/location`, location);
  return response.data;
}
