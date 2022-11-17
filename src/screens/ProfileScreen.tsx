import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ScreenView from "../components/ui/ScreenView";
import ButtonsProfile from "../components/Profile/Buttons.profile";
import { AppColors } from "../contants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { AuthContext } from "../store/AuthContext";
import { TrimPhoneExt } from "../helpers/AppHelpers";
import { use } from "i18next";

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  console.log({ user });

  return (
    <ScreenView>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={require("../contants/images/profile.png")}
          />
          <Text style={{ fontSize: 20 }}>{user.name}</Text>
          <Text style={{ fontSize: 20 }}>company </Text>
        </View>

        <View style={{ flex: 2 }}>
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              marginVertical: 20,
              borderRadius: 20,
            }}
          >
            <View
              style={{
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: AppColors.Thirdnary,
                padding: 8,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ height: 40, fontSize: 20 }}>Name</Text>
              <Text style={{ height: 40, fontSize: 18, color: "silver" }}>
                {user.name}
              </Text>
            </View>
            <View
              style={{
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: AppColors.Thirdnary,
                padding: 8,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ height: 40, fontSize: 20 }}>Field of Work</Text>
              <Text style={{ height: 40, fontSize: 18, color: "silver" }}>
                {user.truck.fieldwork}
              </Text>
            </View>
            <View
              style={{
                height: 50,
                padding: 8,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ height: 40, fontSize: 20 }}>Phone</Text>
              <Text style={{ height: 40, fontSize: 18, color: "silver" }}>
                {TrimPhoneExt(user.phone)}
              </Text>
            </View>
          </View>
          <ButtonsProfile title={"Language"} icon={"ios-language"} />
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              marginVertical: 20,
              borderRadius: 20,
            }}
          >
            <View
              style={{
                height: 50,
                padding: 8,
                flexDirection: "row",
              }}
            >
              <Ionicons
                name="ios-lock-closed-outline"
                size={24}
                color="black"
              />
              <Text style={{ marginLeft: 10, height: 40, fontSize: 20 }}>
                Change password
              </Text>
            </View>
            <View
              style={{
                height: 50,
                padding: 8,
                flexDirection: "row",
              }}
            >
              <MaterialIcons name="local-police" size={24} color="black" />
              <Text style={{ marginLeft: 10, height: 40, fontSize: 20 }}>
                privacy and policy
              </Text>
            </View>
            <Pressable
              style={{
                height: 50,
                padding: 8,
                flexDirection: "row",
              }}
            >
              <Ionicons name="ios-help-outline" size={24} color="black" />
              <Text style={{ marginLeft: 10, height: 40, fontSize: 20 }}>
                help
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="chevron-forward" size={25} color="black" />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f1f6",
  },
});
