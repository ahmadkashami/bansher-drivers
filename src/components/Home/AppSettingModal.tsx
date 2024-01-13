import { Linking, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';


import AppAlert from '../ui/AppAlert';



const AppSettingModal = ({ isVisible, setIsVisble }) => {
    const { t } = useTranslation()

    const openSettingHandler = () => {
        if (Platform.OS == 'ios') {
            Linking.openURL('app-settings:')
        } else {
            startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
        }
    }

    return (
        <AppAlert setVisble={setIsVisble} visible={isVisible} confirmMessage="go to setting" onConfirm={() => { openSettingHandler() }} title={t("PermissionsRequired") as string} message={t("LocationPermissionShouldGranted")} />
    )
}

export default AppSettingModal

const styles = StyleSheet.create({})