import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../../contants/Colors";

const CommingSoonButton = () => {
  return (
    <Text
      style={{
        textTransform: "capitalize",
        color: AppColors.white,
        fontSize: 25,
        padding: 20,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        backgroundColor: AppColors.primary,
      }}
    >
      comming soon
    </Text>
  );
};

export default CommingSoonButton;

const styles = StyleSheet.create({});
