
import Constants from 'expo-constants'
import { Dimensions, Platform } from 'react-native'
const pkg = Constants.expoConfig?.android?.package
    ? Constants.expoConfig?.android?.package
    : 'com.yamak.driver'

const isIos = Platform.OS === 'ios'

const deviceWidth = Dimensions.get("screen").width
const deviceHeight = Dimensions.get("screen").height
export const AppContants = {
    PacakgeName: pkg,
    isIos,
    deviceWidth,
    deviceHeight
}