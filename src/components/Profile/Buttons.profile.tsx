import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "../../contants/Colors";
import React from "react";

const ButtonsProfile = ({ title, icon = "home" }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          height: 60,
          width: "100%",
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
          backgroundColor: AppColors.white,
          borderRadius: 20,
          paddingHorizontal: 20,
        },
        pressed && styles.pressed,
      ]}
    >
      <Ionicons
        style={{ marginRight: 15 }}
        name={icon}
        size={30}
        color="black"
      />
      <Text style={{ fontSize: 20, textAlign: "center" }}>{title}</Text>
    </Pressable>
  );
};

export default ButtonsProfile;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
