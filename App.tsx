import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

import { TruckDto } from "./src/Dtos/user.dto";
import MainStackNavigation from "./src/navigations/MainStack.Navigation";
import AuthScreen from "./src/screens/AuthScreen";
import { AuthContext, AuthProvider } from "./src/store/AuthContext";
import { TruckContext, TruckProvider } from "./src/store/truckContext";
import "./src/translation/Translation.config";

export default function App() {
  return (
    <AuthProvider>
      <TruckProvider>
        <Root />
      </TruckProvider>
    </AuthProvider>
  );
}
const Root = () => {
  const [fontsLoaded] = useFonts({
    "Gotham-black": require("./src/contants/fonts/Gotham-Light.otf"),
  });
  const authctx = useContext(AuthContext);
  const truckCtx = useContext(TruckContext);

  useEffect(() => {
    async function prepareApp() {
      const token = await AsyncStorage.getItem("token");
      //todo change truck to sperate item in localstoreage
      const cashedUser = await AsyncStorage.getItem("user");
      console.log({ cashedUser });

      if (cashedUser) {
        const user = JSON.parse(cashedUser);
        authctx.authUser(user);
        truckCtx.updateTruck(new TruckDto(user.truck));
      }
      if (token) {
        authctx.authenticate(token);
      }
    }
    prepareApp();
  }, [authctx.isAuthticated]);
  return authctx.isAuthticated ? <MainStackNavigation /> : <AuthScreen />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
