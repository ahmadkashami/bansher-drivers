import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../contants/Colors";

const FilledButton = ({ children }: { children: string }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default FilledButton;

const styles = StyleSheet.create({
  container: {
    minWidth: "90%",
    minHeight: 70,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  pressed: { opacity: 0.7 },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "capitalize",
  },
});
