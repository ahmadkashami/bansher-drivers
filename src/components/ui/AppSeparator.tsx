import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColorsTheme2 } from '../../contants/Colors'

const AppSeparator = () => {
  return (
    <View style={{ borderWidth: 1, width: "90%", alignSelf: "center", marginVertical: 10, borderColor: AppColorsTheme2.gray }}>

    </View>
  )
}

export default AppSeparator

const styles = StyleSheet.create({})