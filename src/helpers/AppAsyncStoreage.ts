import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageConstants } from "../contants/AppConstants";

export async function setStorageValues(name: string, value: string) {
  await AsyncStorage.setItem(name, value);
}

export async function deleteStorageValue(name: string) {
  await AsyncStorage.removeItem(name);
}

export async function getStorageValues(name: string) {
  return AsyncStorage.getItem(name);
}

export async function removeAllKeys() {
  return AsyncStorage.multiRemove([AsyncStorageConstants.token, AsyncStorageConstants.user, AsyncStorageConstants.vehicle]);
}