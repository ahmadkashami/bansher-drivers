import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { UserDto } from "../../Dtos/user.dto";

const HeaderSection = ({ user }: { user: UserDto }) => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        bottom: -40,
      }}
    >
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Text style={{ textAlign: "left", fontSize: 20, marginRight: 30 }}>
          {t("Hello")}
        </Text>

        <Text style={{ textAlign: "left", fontSize: 20 }}>{user.name}</Text>
      </View>

      <Image
        style={{ width: 100, height: 100, resizeMode: "contain" }}
        source={require("../../contants/images/profile.png")}
      />
    </View>
  );
};

export default HeaderSection;

const styles = StyleSheet.create({});
