import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { AppColors } from "../../contants/Colors";
import { UserDto } from "../../Dtos/user.dto";
import { TrimPhoneExt } from "../../helpers/AppHelpers";

const InfoProfile: FC<{ user: UserDto }> = ({ user }) => {
  return (
    <View style={styles.container}>
      <InfoItem myKey={"Name"} value={user.name} />
      <InfoItem myKey="Field of Work" value={user.truck.fieldwork} />
      <InfoItem myKey="Phone" value={TrimPhoneExt(user.phone)} />
    </View>
  );
};

export default InfoProfile;

export const InfoItem = ({
  myKey,
  value,
}: {
  myKey: string;
  value: string;
}) => {
  console.log(myKey);

  return (
    <View style={styles.itemContainer}>
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
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
