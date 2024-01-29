import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
import { AppLanguages, AsyncStorageConstants } from "../contants/AppConstants";


const STORE_LANGUAGE_KEY = "lang";

const languageDetectorPlugin = {
  type: "languageDetector",
  async: true,
  init: () => { },
  detect: async function (callback: (lang: string) => void) {
    try {


      await AsyncStorage.getItem(AsyncStorageConstants.languageKey).then((language) => {
        console.log({ language });

        if (!language) {
          I18nManager.forceRTL(true);
          I18nManager.allowRTL(true);
          I18nManager.swapLeftAndRightInRTL(true);
          AsyncStorage.setItem(AsyncStorageConstants.languageKey, AppLanguages.arabic);
          return callback(AppLanguages.arabic);
        }

        if (language === "ar") {
          I18nManager.forceRTL(true);
          I18nManager.allowRTL(true);
          I18nManager.swapLeftAndRightInRTL(true);
        } else {
          I18nManager.forceRTL(false);
          I18nManager.allowRTL(false);
        }
        return callback(language);

      });
    } catch (error) {
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      //save a user's language choice in Async storage
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) { }
  },
};

export { languageDetectorPlugin };
