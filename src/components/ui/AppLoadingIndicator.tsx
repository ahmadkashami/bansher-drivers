import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const AppLoadingIndicator = () => {
  return (
    <ActivityIndicator
      color={"dodgerblue"}
      size={100}
      style={{
        zIndex: 100,
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

export default AppLoadingIndicator;

const styles = StyleSheet.create({});
