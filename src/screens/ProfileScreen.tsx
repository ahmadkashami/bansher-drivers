import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  View,
  I18nManager,
  Linking,
  ScrollView
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import ScreenView from "../components/ui/ScreenView";
import InfoProfile from "../components/Profile/Info.profile";
import LanguageSection from "../components/Profile/Language.section";
import useAppStore from "../store/userStore";
import AppText from "../components/ui/AppText";
import { AppColors } from "../contants/Colors";

const ProfileScreen = () => {
  const stateApp = useAppStore()
  const { t } = useTranslation();
  const user = stateApp.user;

  return (
    <ScreenView>
      <ScrollView style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            marginTop: "20%"
          }}
        >
          <View style={{
            borderWidth: 1,
            borderColor: AppColors.primary,
            width: 100, height: 100, borderRadius: 50, justifyContent: "center", alignItems: "center"
          }}>
            <Image
              style={styles.img}
              source={{ uri: stateApp.user.photo }} />
          </View>
          <AppText size={20} >{user.name}</AppText>
          {/* <AppText size={18} >company </AppText> */}
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
            <Pressable
              style={{
                height: 50,
                padding: 8,
                flexDirection: "row",
              }}
              onPress={() => Linking.openURL("https://yamak-kw.com/terms")}

            >
              <Ionicons
                name="ios-lock-closed-outline"
                size={24}
                color="black"
              />
              <AppText style={{ marginLeft: 10, height: 40 }}>
                {t("TermOfService")}
              </AppText>
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
            {/* <View
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
              <AppText style={{ marginLeft: 10, height: 40, fontSize: 20 }}>
                {t("ChangePassword")}
              </AppText>
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
            </View> */}
            <Pressable
              onPress={() => Linking.openURL("https://yamak-kw.com/privacy")}
              style={({ pressed }) => [styles.operations, pressed && { opacity: 0.7 }]}>
              <MaterialIcons name="local-police" size={24} color="black" />
              <AppText style={{ marginLeft: 10, height: 40 }}>
                {t("PrivacyAndPolicy")}
              </AppText>
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
              onPress={() => Linking.openURL("https://yamak-kw.com")}
              style={({ pressed }) => [
                styles.operations,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="ios-help-outline" size={24} color="black" />
              <AppText style={{ marginLeft: 10, height: 40, }}>
                {t("Help")}
              </AppText>
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
      </ScrollView>
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
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: AppColors.secondary
  },
});
