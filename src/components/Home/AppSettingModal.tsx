import { Linking, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';


import AppAlert from '../ui/AppAlert';
import { getStorageValues, setStorageValues } from '../../helpers/AppAsyncStoreage';
import { AsyncStorageConstants } from '../../contants/AppConstants';



const AppSettingModal = ({ isVisible, setIsVisble, loctionPermission }) => {
    const { t } = useTranslation()



    const openSettingHandler = () => {
        if (Platform.OS == 'ios') {
            Linking.openURL('app-settings:')
        } else {
            startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
        }
    }

    const skipPressHandler = async () => {
        await setStorageValues(AsyncStorageConstants.isSkipedPermissions, "true")
        setIsVisble(false)

    }

    const onCancelFn = (loctionPermission?.bg == true && loctionPermission.fg == false) ? skipPressHandler : undefined

    return (
        <AppAlert cancelMessage={t("Skip")} onCancel={onCancelFn} setVisble={setIsVisble} visible={isVisible} confirmMessage={t("GoToSetting")} onConfirm={() => { openSettingHandler() }} title={t("PermissionsRequired") as string} message={t("LocationPermissionShouldGranted")} />
    )
}

export default AppSettingModal

const styles = StyleSheet.create({})