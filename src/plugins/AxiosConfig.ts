import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const baseURL = "https://yamak-kw.com/api/driver-app/v1/"

export const client = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

client.interceptors.request.use(async (request) => {
  const token = await AsyncStorage.getItem("token");
  request.headers["Authorization"] = token ? `Bearer ${token}` : "";
  return request;
});
