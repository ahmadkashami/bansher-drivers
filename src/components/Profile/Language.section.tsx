import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import ButtonsProfile from "./Buttons.profile";
import LanguagePicker from "../languagePicker";

const LanguageSection = () => {
  const { t } = useTranslation();
  const [isPickingLanguage, setIsPickingLanguage] = useState(false);
  function pickingLanguageHandler(isPicking: boolean) {
    setIsPickingLanguage(isPicking);
  }

  return (
    <>
      <ButtonsProfile
        title={t("Language")}
        icon={"ios-language"}
        onPress={() => pickingLanguageHandler(true)}
      />
      {isPickingLanguage && (
        <LanguagePicker
          isPickingLanguage={isPickingLanguage}
          pickingLanguageHandler={pickingLanguageHandler}
        />
      )}
    </>
  );
};

export default LanguageSection;

const styles = StyleSheet.create({});
