import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const client = axios.create({
  baseURL: "http://192.168.131.249:5010/api/driver-app/v1/",
  headers: {
    Accept: "application/json",
  },
});

client.interceptors.request.use(async (request) => {
  const token = await AsyncStorage.getItem("token");
  request.headers["Authorization"] = token ? `Bearer ${token}` : "";
  return request;
});
