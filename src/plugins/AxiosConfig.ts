import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const baseURL = "http://192.168.1.111:5004/api/driver-app/v1/"
export const client = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

client.interceptors.request.use(async (request) => {
  const token = await AsyncStorage.getItem("token");
  request.headers["Authorization"] = token ? `Bearer ${token}` : "";
  return request;
});
