import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColorsTheme2 } from '../../contants/Colors'
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useAppStore from '../../store/userStore';
import AppText from './AppText';


const AppHeader = ({ logout = true, title = "", logo = true }) => {
    const stateApp = useAppStore()
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>

            {logout &&
                <View style={{ flex: 1, alignItems: "flex-start" }}>
                    <Ionicons
                        name="log-out-outline"
                        size={30}
                        color={AppColorsTheme2.white}
                        onPress={stateApp.logout}
                    />
                </View>
            }
            {
                title && (
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <AppText color="white" size={20} >
                            {title}
                        </AppText>
                    </View>
                )
            }

            {
                logo && (
                    <View style={{ alignSelf: "center", flex: 1, alignItems: "flex-end" }}>
                        <Image style={{ width: 50, height: 50 }} source={require("../../contants/images/logo1.png")} />
                    </View>
                )
            }

        </View>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 16,
        backgroundColor: AppColorsTheme2.primary,
        justifyContent: "center",
        alignItems: "center",
    }
})