import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setStoreageValues(name: string, value: string) {
  await AsyncStorage.setItem(name, value);
}

export async function deleteStoreageValue(name: string) {
  await AsyncStorage.removeItem(name);
}

export async function getStoreageValues(name: string, value: string) {
  return AsyncStorage.setItem(name, value);
}
