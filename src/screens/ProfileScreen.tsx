import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  I18nManager,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import ScreenView from "../components/ui/ScreenView";
import { AuthContext } from "../store/AuthContext";
import InfoProfile from "../components/Profile/Info.profile";
import LanguageSection from "../components/Profile/Language.section";

const ProfileScreen = () => {
  const { t } = useTranslation();

  const { user } = useContext(AuthContext);

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
          <InfoProfile user={user} />
          <LanguageSection />
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
                {t("ChangePassword")}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name={I18nManager.isRTL ? "chevron-back" : "chevron-forward"}
                  size={25}
                  color="black"
                />
              </View>
            </View>
            <Pressable style={styles.operations}>
              <MaterialIcons name="local-police" size={24} color="black" />
              <Text style={{ marginLeft: 10, height: 40, fontSize: 20 }}>
                {t("PrivacyAndPolicy")}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name={I18nManager.isRTL ? "chevron-back" : "chevron-forward"}
                  size={25}
                  color="black"
                />
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                Alert.alert("help");
              }}
              style={({ pressed }) => [
                styles.operations,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="ios-help-outline" size={24} color="black" />
              <Text style={{ marginLeft: 10, height: 40, fontSize: 20 }}>
                {t("Help")}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name={I18nManager.isRTL ? "chevron-back" : "chevron-forward"}
                  size={25}
                  color="black"
                />
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
  operations: {
    height: 50,
    padding: 8,
    flexDirection: "row",
  },
  pressed: {
    opacity: 0.7,
  },
});
