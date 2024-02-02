import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { AppSizes } from '../../contants/Sizes'
import { AppFonts } from '../../contants/Fonts'


const AppText = ({ children, size = AppSizes.medium, textStyle, style, color = "black" }: { children: ReactNode, color?: string, size?: number, textStyle?: TextStyle, style?: ViewStyle }) => {
    return (
        <View style={[style && style]}>
            <Text style={[{ fontFamily: AppFonts.Roboto_Med, fontSize: size, color: color }, textStyle && textStyle]}>{children}</Text>
        </View>
    )
}

export default AppText

const styles = StyleSheet.create({})