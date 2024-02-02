import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { AntDesign, MaterialIcons, MaterialCommunityIcons, Ionicons, Entypo, FontAwesome, Fontisto } from '@expo/vector-icons';

interface props {
    type?: "Ionicons" | "AntDesign" | "MaterialIcons" | "Entypo" | "FontAwesome" | "Fontisto" | "MaterialCommunityIcons",
    name?: string, size?: number, color?: string, onPress: () => void
}


const PressbleAppIcon = ({ size = 25, color = "black", name = "home", type = "Ionicons", onPress }: props) => {
    let iconType = iconTypeEnum[type](name, size, color)
    return (
        <Pressable onPress={onPress}>
            {iconType}
        </Pressable>
    )
}

export default PressbleAppIcon

export const iconTypeEnum = {
    AntDesign: (name: string, size: number, color: string) => <AntDesign name={name} size={size} color={color} />,
    Ionicons: (name: string, size: number, color: String) => <Ionicons name={name} size={size} color={color} />,
    MaterialIcons: (name: string, size: number, color: string) => <MaterialIcons name={name} size={size} color={color} />,
    Entypo: (name: string, size: number, color: string) => <Entypo name={name} size={size} color={color} />,
    FontAwesome: (name: string, size: number, color: string) => <FontAwesome name={name} size={size} color={color} />,
    Fontisto: (name: string, size: number, color: string) => <Fontisto name={name} size={size} color={color} />,
    MaterialCommunityIcons: (name: string, size: number, color: string) => <MaterialCommunityIcons name={name} size={size} color={color} />,

}
const styles = StyleSheet.create({})