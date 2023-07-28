import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

import MainStackNavigation from "./src/navigations/MainStack.Navigation";
import AuthScreen from "./src/screens/AuthScreen";
import "./src/translation/Translation.config";
import useAppStore from "./src/store/userStore";

export default function App() {

  return (
        <Root  />
  );
}
const Root = () => {
  const [fontsLoaded] = useFonts({
    "Gotham-black": require("./src/contants/fonts/Gotham-Light.otf"),
  });
  const stateApp=useAppStore()
  useEffect(() => {
    async function prepareApp() {
      const token = await AsyncStorage.getItem("token");
      const cashedUser = await AsyncStorage.getItem("user");
      const cashedVehicle = await AsyncStorage.getItem("vehicle");

      if (cashedUser) {
        const user = JSON.parse(cashedUser);
        stateApp.setUser(user)
        if (cashedVehicle) {
          const vehicle = JSON.parse(cashedVehicle);
          stateApp.setVehicle(vehicle)
        }
      }
      if (token) {
        stateApp.setAuthToken(token)
      }
    }
    prepareApp();
  }, [stateApp.isAuthenticated]);

  return stateApp.isAuthenticated ? <MainStackNavigation /> : <AuthScreen />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
