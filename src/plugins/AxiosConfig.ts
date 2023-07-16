import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:5010/api/driverapp/v1/",
  headers: {
    Accept: "application/json",
  },
});

client.interceptors.request.use(async (request) => {
  const token = await AsyncStorage.getItem("token");
  request.headers["Authorization"] = token ? `Bearer ${token}` : "";
  return request;
});
