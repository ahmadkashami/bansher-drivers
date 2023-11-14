import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import MainStackNavigation from "./src/navigations/MainStack.Navigation";
import AuthScreen from "./src/screens/AuthScreen";
import "./src/translation/Translation.config";
import useAppStore from "./src/store/userStore";


SplashScreen.preventAutoHideAsync();

export default function App() {

  return (
    <Root />
  );
}
const Root = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-MedItalic": require("./src/contants/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Med": require("./src/contants/fonts/Roboto-Medium.ttf"),
  });
  const [appIsReady, setAppIsReady] = useState(false);

  const stateApp = useAppStore()
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
    if (fontsLoaded) {
      setAppIsReady(true);
      setTimeout(async () => {
        await SplashScreen.hideAsync()
      }, 2000);;
    }

    prepareApp();
  }, [stateApp.isAuthenticated, fontsLoaded]);

  if (!appIsReady) {
    return null;
  }

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
