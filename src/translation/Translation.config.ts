import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { languageDetectorPlugin } from "../helpers/LnguageDetector";
import { en, ar } from "./localization";

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};
//@ts-ignore
i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
      compatibilityJSON: 'v3',
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
