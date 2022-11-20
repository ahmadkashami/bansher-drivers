import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../../contants/Colors";

const ActiveButton = ({
  disabled,
  onPress,
  isActive,
  text,
}: {
  disabled: boolean;
  onPress: () => void;
  isActive: boolean;
  text: string;
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
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default ActiveButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    width: 150,
    height: 150,
    borderRadius: 75,
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
