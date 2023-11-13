import { Platform, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import React, { ReactNode } from "react";

const ScreenView = ({ children }: { children: JSX.Element }) => {
  return <SafeAreaView style={styles.AndroidSafeArea}>{children}</SafeAreaView>;
};

export default ScreenView;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
