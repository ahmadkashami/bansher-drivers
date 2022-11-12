import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainStackNavigation from "./src/navigations/MainStack.Navigation";
import AuthScreen from "./src/screens/AuthScreen";
import { AuthContext, AuthProvider } from "./src/store/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
const Root = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    async function prepareApp() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        auth.authenticate(token);
      }
    }
    prepareApp();
  }, []);
  console.log(auth.isAuthticated);

  return auth.isAuthticated ? <MainStackNavigation /> : <AuthScreen />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
