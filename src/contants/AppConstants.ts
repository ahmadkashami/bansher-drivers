
import Constants from 'expo-constants'
import { Dimensions, Platform } from 'react-native'
const pkg = Constants.expoConfig?.android?.package
    ? Constants.expoConfig?.android?.package
    : 'com.yamak.driver'

const isIos = Platform.OS === 'ios'
const locationBgTask = 'background-location-task';
const locationTimeInterval = 90000
const locationDistanceInterval = 900;
export const AsyncStorageConstants = {
    env: "environment",
    isLunched: "isLunched",
    languageKey: "lang",
    userLocation: "userLocation",
    appleLoginKeys: "appleLoginKeys",
    fcmToken: "fcmToken"

}

export const AppLanguages = {
    arabic: "ar",
    english: "en"
}
const deviceWidth = Dimensions.get("screen").width
const deviceHeight = Dimensions.get("screen").height
export const AppContants = {
    PacakgeName: pkg,
    isIos,
    deviceWidth,
    deviceHeight,
    locationBgTask,
    locationTimeInterval,
    locationDistanceInterval,

}