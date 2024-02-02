import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import MainStackNavigation from "./src/navigations/MainStack.Navigation";
import AuthScreen from "./src/screens/AuthScreen";
import "./src/translation/Translation.config";
import useAppStore from "./src/store/userStore";
import FlashMessage from "react-native-flash-message";

import Toast from "react-native-toast-message";

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

      if (cashedUser) {
        const user = JSON.parse(cashedUser);
        stateApp.setUser(user)
      }
      if (token) {
        stateApp.setAuthToken(token)
      }
    }

    if (fontsLoaded) {
      setAppIsReady(true);
      setTimeout(async () => {
        await SplashScreen.hideAsync()
      }, 3000);;
    }

    prepareApp();
  }, [stateApp.isAuthenticated, fontsLoaded]);

  if (!appIsReady) {
    return null;
  }

  return <>
    {stateApp.isAuthenticated ? <MainStackNavigation /> : <AuthScreen />}
    <FlashMessage />
    <Toast />
  </>
};


