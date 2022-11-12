import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainStackNavigation from "./src/navigations/MainStack.Navigation";
import AuthScreen from "./src/screens/AuthScreen";

export default function App() {
  const [isAuthenticated, setIsAuthecated] = useState(true);

  return isAuthenticated ? <MainStackNavigation /> : <AuthScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
