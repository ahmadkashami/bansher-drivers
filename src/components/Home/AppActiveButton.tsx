import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../../contants/Colors";
import { useTranslation } from "react-i18next";

const AppActiveButton = ({
  disabled,
  isActive,
  onPress,
}: {
  disabled: boolean;
  isActive: boolean;
  onPress: () => void;
}) => {
  const { t } = useTranslation();

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
      <Text style={styles.text}>{isActive ? t("Online") : t("Offline")}</Text>
    </Pressable>
  );
};

export default AppActiveButton;

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
