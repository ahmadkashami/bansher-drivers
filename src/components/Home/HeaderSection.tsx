import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { UserDto } from "../../Dtos/user.dto";
import { LatLng } from "../../interfaces/types";

const HeaderSection = ({
  user,
  lcoation,
}: {
  user: UserDto;
  lcoation: any;
}) => {
  console.log({ lcoation });

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
      {lcoation && (
        <Text style={{ textAlign: "left", fontSize: 20 }}>
          lat:{lcoation.lat} -- lon:{lcoation.lon}
        </Text>
      )}
      <Image
        style={{ width: 100, height: 100, resizeMode: "contain" }}
        source={require("../../contants/images/profile.png")}
      />
    </View>
  );
};

export default HeaderSection;

const styles = StyleSheet.create({});
