import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { FC } from "react";
import { AppColors } from "../../contants/Colors";
import { UserDto } from "../../dtos/UserDto";
import { TrimPhoneExt } from "../../helpers/AppHelpers";
import { useTranslation } from "react-i18next";

const InfoProfile: FC<{ user: UserDto }> = ({ user }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <InfoItem myKey={t("Name")} value={user.name} />
      <InfoItem myKey={t("fieldOfWork")} value={user.truck.fieldwork} />
      <InfoItem
        myKey={t("Phone")}
        value={TrimPhoneExt(user.phone)}
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
      <Text style={{ height: 40, fontSize: 20 }}>{myKey}</Text>
      <Text style={{ height: 40, fontSize: 18, color: "silver" }}>{value}</Text>
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
    justifyContent: "space-between",
  },
});
