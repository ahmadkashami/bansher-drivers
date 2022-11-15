import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../../contants/Colors";

const AppActiveButton = ({
  disabled,
  isActive,
  onPress,
}: {
  disabled: boolean;
  isActive: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        isActive && { backgroundColor: AppColors.primary },
      ]}
    >
      <Text style={styles.text}>{isActive ? "online" : "offline"}</Text>
    </Pressable>
  );
};

export default AppActiveButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  text: {
    color: AppColors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.6,
  },
});
