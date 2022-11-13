import axios from "axios";

export const client = axios.create({
  baseURL: "https://bansher.herokuapp.com/api/mobile/truck/v1",
  headers: {
    Accept: "application/json",
  },
});

client.interceptors.request.use((request) => {
  console.log(request);
  return request;
});
