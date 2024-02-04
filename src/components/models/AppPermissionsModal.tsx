import { BackHandler, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AppAlert from '../ui/AppAlert'
import { errorMessageToast } from '../../helpers/AppHelpers'

const AppPermissionsModal = ({ data, onSuccess, setIsVisble, isVisible }) => {
    const { t } = useTranslation()

    function onCancelFn() {
        console.log("app denied");
        setIsVisble(false)
        errorMessageToast(t("ErrorHappen"), t("PermissionsRequired"))
    }

    function onConfirmHandler() {
        console.log("accepted")
        setIsVisble(false)
        onSuccess(data)
    }

    return (
        <AppAlert cancelMessage={t("Deny") as string} onCancel={onCancelFn} setVisble={setIsVisble} visible={isVisible} confirmMessage={t("Accept") as string} onConfirm={() => { onConfirmHandler() }} title={""} message={t("YamakAppCollectLocation")} />

    )
}

export default AppPermissionsModal

const styles = StyleSheet.create({})