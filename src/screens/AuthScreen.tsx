import {
    ActivityIndicator,
    Alert,
    Button,
    I18nManager,
    Image,
    Linking,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

import FilledButton from "../components/FilledButton";
import { login } from "../api/AuthApi";
import { UserDto } from "../dtos/UserDto";
import { ErrorHandlerApi, errorMessageToast } from "../helpers/AppHelpers";
import LottieFile from "../components/ui/LottieFile";
import { showMessage, } from "react-native-flash-message";
import useAppStore from "../store/userStore";
import { emailValidator } from "../helpers/validation";
import AppPressable from "../components/ui/AppPressable";
import AppText from "../components/ui/AppText";
import { getVehicle } from "../api/vehiclesApi";
import { useTranslation } from "react-i18next";
import { AppContants, AppLanguages, AsyncStorageConstants } from "../contants/AppConstants";
import { getStorageValues, setStorageValues } from "../helpers/AppAsyncStoreage";
import { useLanguage } from "../hooks/useLanguage.hook";
import { AppColorsTheme2 } from "../contants/Colors";
import AppPermissionsModal from "../components/models/AppPermissionsModal";

const AuthScreen = () => {
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPermissionAlertModal, setShowPermissionAlertModal] = useState(false)
    const [authedResponseData, setAuthedResponseData] = useState(null)
    const stateApp = useAppStore()
    const { t, i18n } = useTranslation()
    const { currentLanguage } = useLanguage()
    const languageLabel = currentLanguage == "en" ? "عربي" : "English"


    async function submitHandler() {
        if (!inputs.password || !inputs.email) {
            errorMessageToast(t("ErrorHappen"), t("InvalidInputs"))
            return;
        }
        if (!emailValidator(inputs.email)) {
            errorMessageToast(t("ErrorHappen"), t("InvalidInputs"))
            return;
        }

        try {
            setIsLoading(true);
            const { data } = await login(
                inputs.email,
                inputs.password
            );
            console.log({ data });

            const isLucnchedBefore = await getStorageValues(AsyncStorageConstants.isLucnchedBefore)
            console.log({ isLucnchedBefore });

            if (!isLucnchedBefore && Platform.OS == "android") {
                setAuthedResponseData(data)
                setShowPermissionAlertModal(true)
                return
            }

            const driver = data.driver;
            const accessToken = data.accessToken;
            if (!driver) throw new Error("Authenticated error");
            getVehicleData()
            const user = new UserDto(driver);
            await setStorageValues(AsyncStorageConstants.token, accessToken);
            await setStorageValues(AsyncStorageConstants.user, JSON.stringify(user));
            stateApp.setUser(user);
            stateApp.setAuthToken(accessToken);
        } catch (error: any) {
            if (error?.response?.data) {
                console.log(error.response.data);

                const errorMessage = ErrorHandlerApi(error);
                errorMessageToast(t("ErrorHappen"), errorMessage)

            } else {
                console.log({ error });

                errorMessageToast(t("ErrorHappen"), error.message)
            }
        } finally {
            setIsLoading(false);
        }
    }

    function inputsChangeHandler(text: string, name: string) {
        setInputs((prev) => {
            return { ...prev, [name]: text };
        });
    }
    function getVehicleData() {
        getVehicle().then((response: any) => {
            let vehicle = response.data.data
            stateApp.setVehicle(vehicle)
            AsyncStorage.setItem(AsyncStorageConstants.vehicle, JSON.stringify(vehicle));
        }).catch(error => {
            console.log({ error: error?.response?.data });

            if (error?.response?.data) {
                const errorMessage = ErrorHandlerApi(error);
                errorMessageToast(t("ErrorHappen"), errorMessage)

            } else {
                errorMessageToast(t("ErrorHappen"), error.message)
            }
        })
    }

    async function onConfirmPermissionsHandler(data: any) {
        try {

            const res = await AsyncStorage.getAllKeys()
            console.log({ res });

            const driver = data.driver;
            const accessToken = data.accessToken;
            if (!driver) throw new Error("Authenticated error");
            await setStorageValues(AsyncStorageConstants.token, accessToken);
            await setStorageValues(AsyncStorageConstants.isLucnchedBefore, "true")
            const user = new UserDto(driver);
            await setStorageValues(AsyncStorageConstants.user, JSON.stringify(user));
            getVehicleData()
            stateApp.setUser(user);
            stateApp.setAuthToken(accessToken);
            // console.log("end confirm");
        } catch (error) {
            console.log({ error: JSON.stringify(error) });

            if (error?.response?.data) {
                const errorMessage = ErrorHandlerApi(error);
                errorMessageToast(t("ErrorHappen"), errorMessage)
            } else {
                errorMessageToast(t("ErrorHappen"), error.message)
            }
        }

    }

    async function handleLanguagePress() {

        const appLanguage = await getStorageValues(AsyncStorageConstants.languageKey)
        const changeLang = appLanguage === AppLanguages.english ? AppLanguages.arabic : AppLanguages.english

        i18n.changeLanguage(changeLang).then(async (res) => {
            if (changeLang === "ar") {
                I18nManager.forceRTL(true);
                I18nManager.allowRTL(true);
                I18nManager.swapLeftAndRightInRTL(true);
            } else {
                I18nManager.forceRTL(false);
                I18nManager.allowRTL(false);
            }
            await setStorageValues(AsyncStorageConstants.languageKey, changeLang);
            await Updates.reloadAsync();

        });

    }


    return (
        <>
            <StatusBar animated={true} style="auto" />
            <SafeAreaProvider style={{ flex: 1 }}>
                {isLoading && <LottieFile />}
                <View style={styles.container}>
                    <KeyboardAwareScrollView>

                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                padding: 16,
                                alignSelf: "center",
                            }}
                        >
                            <AppPressable
                                onPress={() => handleLanguagePress()}
                                style={styles.languageStyle}>
                                <AppText size={currentLanguage == "en" ? 18 : 16}>
                                    {languageLabel}
                                </AppText>
                            </AppPressable>
                            <View style={{ paddingTop: 40, paddingBottom: 0 }}>
                                <Image
                                    style={{ width: 200, height: 200, resizeMode: "cover" }}
                                    source={require("../contants/images/logo1.png")}
                                />
                            </View>

                            <View style={{ marginVertical: 5 }}>
                                <AppText
                                    textStyle={{
                                        marginTop: 20,
                                        fontSize: 25,
                                        fontWeight: "600",
                                        letterSpacing: 2,
                                        textAlign: "center",
                                    }}
                                >
                                    {t("HelloAgain")}
                                </AppText>
                                <Text
                                    numberOfLines={2}
                                    style={{
                                        width: 300,
                                        textAlign: "center",
                                        fontSize: 16,
                                        letterSpacing: 4,
                                        marginTop: 8,
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {t("WelcomeBack")}
                                </Text>
                            </View>

                            {/* <View style={styles.innerContainer}> */}
                            <View style={styles.inputBox}>
                                <TextInput
                                    value={inputs.email}
                                    placeholder={t("EnterEmail")}

                                    autoCapitalize="none"
                                    placeholderTextColor={"#a4a3a8"}
                                    style={styles.inputs}
                                    onChangeText={(text) => inputsChangeHandler(text, "email")}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput
                                    // secureTextEntry
                                    value={inputs.password}
                                    placeholder={t("EnterPassword")}
                                    autoCapitalize="none"
                                    placeholderTextColor={"#a4a3a8"}
                                    style={styles.inputs}
                                    onChangeText={(text) => inputsChangeHandler(text, "password")}
                                />
                            </View>
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        alignSelf: "flex-start",
                                        flex: 1,
                                        marginHorizontal: 20

                                    },
                                    pressed && { opacity: 0.3 },
                                ]}
                            >
                                <AppText
                                    textStyle={{
                                        marginRight: 20,
                                        marginVertical: 15,
                                    }}
                                >
                                    {t("ForgotPassword")}
                                </AppText>
                            </Pressable>
                            <View style={{ paddingVertical: 20 }}>
                                <FilledButton onPress={submitHandler}>{t("Submit")}</FilledButton>
                            </View>
                        </View>

                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <AppText textStyle={{ fontSize: 16 }}>
                                {t("IfYouNeedHelp")}
                            </AppText>
                            <AppPressable onPress={() => { Linking.openURL("https://yamak-kw.com") }}>
                                <AppText
                                    textStyle={{ color: "dodgerblue", marginTop: 10 }}
                                >
                                    {t("ContactHelp")}
                                </AppText>
                            </AppPressable>

                        </View>
                    </KeyboardAwareScrollView>
                </View>
                {/* <FlashMessage position="top" /> */}
            </SafeAreaProvider>
            <AppPermissionsModal data={authedResponseData} onSuccess={onConfirmPermissionsHandler} setIsVisble={setShowPermissionAlertModal} isVisible={showPermissionAlertModal} />

        </>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f4f1f6" },
    innerContainer: {
        width: "100%",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
    },
    inputBox: {
        backgroundColor: "white",
        width: AppContants.deviceWidth * 0.8,
        height: 60,
        padding: 16,
        marginVertical: 10,
        borderRadius: 10,
    },
    inputs: {
        textAlign: "right",
        flex: 1,
        fontSize: 16,
        fontWeight: "600"
    },
    languageStyle: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        left: 0,
        position: "absolute", top: "10%", width: 70,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
        backgroundColor: AppColorsTheme2.secondary,
        height: 40,

    }
});
