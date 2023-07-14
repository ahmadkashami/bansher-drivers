import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setStorageValues(name: string, value: string) {
  await AsyncStorage.setItem(name, value);
}

export async function deleteStorageValue(name: string) {
  await AsyncStorage.removeItem(name);
}

export async function getStorageValues(name: string, value: string) {
  return AsyncStorage.setItem(name, value);
}
