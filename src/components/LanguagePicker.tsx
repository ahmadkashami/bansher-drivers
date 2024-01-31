import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  I18nManager,
} from "react-native";

import React, { FC, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppColors } from "../contants/Colors";
import AppAlertEmpty from "./ui/AppAlertEmpty";
import AppText from "./ui/AppText";
import { AsyncStorageConstants } from "../contants/AppConstants";

const laguages = [
  {
    name: "en",
    lable: "English",
  },
  { name: "ar", lable: "Arabic" },
];

export interface LanguagePickerProps {
  isPickingLanguage: boolean;
  pickingLanguageHandler: (isPicking: boolean) => void;
}
const LanguagePicker: FC<LanguagePickerProps> = ({
  isPickingLanguage,
  pickingLanguageHandler,
}) => {
  const { i18n, t } = useTranslation(); //i18n instance
  const currnetLang = i18n.language;

  async function selectLanguageHandler(lang: string) {
    i18n.changeLanguage(lang).then((res) => {
      if (lang === "ar") {
        I18nManager.forceRTL(true);
        I18nManager.allowRTL(true);
        I18nManager.swapLeftAndRightInRTL(true);
      } else {
        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);
      }
      AsyncStorage.setItem(AsyncStorageConstants.languageKey, lang);
    });

    await Updates.reloadAsync();

    pickingLanguageHandler(false);
  }
  return (
    <AppAlertEmpty visible={isPickingLanguage} >

      {/* <AppModel isModelOpen={isPickingLanguage}> */}
      <View style={styles.container}>
        <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
          <Ionicons
            name="close"
            size={24}
            color="black"
            onPress={() => pickingLanguageHandler(false)}
          />
        </View>
        <View>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            {t("choseLanguage")}
          </Text>
        </View>
        <View style={{ height: "72%", marginVertical: 10 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={laguages}
            contentContainerStyle={{ paddingTop: 10, justifyContent: "center" }}
            renderItem={({ item }) => {
              return (
                <LanguageItem
                  onPress={selectLanguageHandler}
                  name={item.name}
                  lable={item.lable}
                />
              );
            }}
          />
        </View>
      </View>
      {/* </AppModel> */}
    </AppAlertEmpty>


  );
};

export default LanguagePicker;

const LanguageItem = ({
  name,
  lable,
  onPress,
}: {
  name: string;
  lable: string;
  onPress: (lang: string) => void;
}) => {
  const { i18n, t } = useTranslation(); //i18n instance
  const currnetLang = i18n.language;

  return (
    <Pressable
      onPress={() => onPress(name)}
      style={({ pressed }) => [
        styles.itemContainer,
        pressed && { opacity: 0.7 },
        currnetLang === name && { borderColor: AppColors.secondary },
      ]}
    >
      <AppText>{lable}</AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  itemContainer: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    // borderColor: AppColors.secondary,
  },
});
