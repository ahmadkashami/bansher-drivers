import { StyleSheet, View, ViewStyle } from "react-native";
import React, { FC } from "react";
import { AppColors } from "../../contants/Colors";
import { UserDto } from "../../dtos/UserDto";
import { TrimPhoneExt } from "../../helpers/AppHelpers";
import { useTranslation } from "react-i18next";
import AppText from "../ui/AppText";

const InfoProfile: FC<{ user: UserDto }> = ({ user }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <InfoItem myKey={t("Name")} value={user.name} />
      <InfoItem
        myKey={t("Phone")}
        value={TrimPhoneExt(user.phoneNum)}
        style={{ borderBottomWidth: 0 }}
      />
    </View>
  );
};

export default InfoProfile;

export const InfoItem = ({
  myKey,
  value,
  style,
}: {
  myKey: string;
  value: string;
  style?: ViewStyle;
}) => {
  return (
    <View style={[styles.itemContainer, style]}>
      <AppText>{myKey}</AppText>
      <AppText textStyle={{ fontSize: 18, color: "silver" }} style={{ height: 40, }}>{value}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 20,
    borderRadius: 20,
  },
  itemContainer: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.Thirdnary,
    padding: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
  },
});
