import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const ButtonsProfile = ({ title, icon = "home" }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          height: 60,
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 0.2,
          marginBottom: 10,
        },
        pressed && styles.pressed,
      ]}
    >
      <Ionicons
        style={{ marginRight: 15 }}
        name="person-outline"
        size={30}
        color="black"
      />
      <Text style={{ fontSize: 20 }}>{title}</Text>
    </Pressable>
  );
};

export default ButtonsProfile;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
