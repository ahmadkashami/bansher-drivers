import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Ionicons, Entypo, FontAwesome, Fontisto, FontAwesome5 } from '@expo/vector-icons';


interface Props {
    type?: "Ionicons" | "AntDesign" | "MaterialIcons" | "Entypo" | "FontAwesome" | "Fontisto" | "MaterialCommunityIcons" | "FontAwesome5",
    name?: string,
    size?: number,
    color?: string,
    style?: ViewStyle
}

const AppIcon = ({ size = 25, color = "black", name = "home", type = "Ionicons", style }: Props) => {
    let iconType = iconTypeEnum[type](name, size, color)
    return (
        <View style={style}>
            {iconType}
        </View>
    )
}

export default AppIcon

export const iconTypeEnum = {
    AntDesign: (name: string, size: number, color: string) => <AntDesign name={name} size={size} color={color} />,
    Ionicons: (name: string, size: number, color: String) => <Ionicons name={name} size={size} color={color} />,
    MaterialIcons: (name: string, size: number, color: string) => <MaterialIcons name={name} size={size} color={color} />,
    Entypo: (name: string, size: number, color: string) => <Entypo name={name} size={size} color={color} />,
    FontAwesome: (name: string, size: number, color: string) => <FontAwesome name={name} size={size} color={color} />,
    Fontisto: (name: string, size: number, color: string) => <Fontisto name={name} size={size} color={color} />,
    MaterialCommunityIcons: (name: string, size: number, color: string) => <MaterialCommunityIcons name={name} size={size} color={color} />,
    FontAwesome5: (name: string, size: number, color: string) => <FontAwesome5 name={name} size={size} color={color} />,



}
