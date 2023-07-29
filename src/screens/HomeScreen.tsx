import {FlatList, Image, StyleSheet, Switch, Text, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {AppColors} from "../contants/Colors";
import LottieFile from "../components/ui/LottieFile";
import {t} from "i18next";
import useAppStore from "../store/userStore";
import {putVehicleUnlink} from "../api/AuthApi";
import {ErrorHandlerApi} from "../helpers/AppHelpers";
import FlashMessage, {showMessage} from "react-native-flash-message";

const HomeScreen = () => {
    const stateApp = useAppStore()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isWorkStatus, setIsWorkStatus] = useState(false);
    const [isLinked, setIsLinked] = useState(false);

    const updateWorkStatus = () => {
        setIsLoading(true);
        putVehicleUnlink().then((er)=>{
            setIsWorkStatus(!isWorkStatus)
            showMessage({
                message: "Success Message",
                description: "Update Successfully",
                type: "success",
            });
            setIsLoading(false);
        }).catch((error:any)=>{
            setIsLoading(false);
            if (error?.response?.data) {
                const errorMessage = ErrorHandlerApi(error);
                showMessage({
                    message: "Error Message",
                    description: errorMessage,
                    type: "danger",
                });
            } else {
                showMessage({
                    message: "Error Message",
                    description: error.message,
                    type: "danger",
                });
            }
        })
    }
    const updateVehicleLink = () => {
        setIsLoading(true);
        setIsLinked(!isLinked);
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            {isLoading && <LottieFile/>}
            {/*user profile  */}
            <View style={{
                flex: 1,
                justifyContent: "flex-end",
            }}>
                <View style={{flexDirection: "row", alignItems: "center", marginLeft: 20}}>
                    <Image
                        style={styles.img}
                        source={{uri: stateApp.user.photo}}></Image>
                    <View style={{marginLeft: 20}}>
                        <Text style={{fontSize: 20, color: "gray", marginBottom: 10, textTransform: "capitalize"}}>
                            {stateApp.user.name}
                        </Text>
                        <Text style={{fontSize: 20, color: "gray"}}>
                            {stateApp.user.phoneNum}
                        </Text>
                    </View>
                </View>
                <View style={{position: "absolute", top: 40, right: 20}}>
                    <Ionicons
                        name="log-out-outline"
                        size={30}
                        color={AppColors.black}
                        onPress={stateApp.logout}
                    />
                </View>


                <View style={{
                    height: 220,
                    borderTopEndRadius: 50,
                    borderTopStartRadius: 50,
                    bottom: -80,
                    alignItems: "center",
                    backgroundColor: AppColors.primary
                }}
                >
                    <FlatList
                        data={["Orders", "Requests"]}
                        horizontal
                        contentContainerStyle={{width: "100%", flex: 1, justifyContent: "center"}}
                        renderItem={({item}) => {
                            return (
                                <View style={{
                                        width: 100,
                                        height: 100,
                                        marginHorizontal: 10,
                                        marginVertical: 30,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 20,
                                        backgroundColor: "rgba(190, 221, 231,0.3)",
                                    }}>
                                    <Text style={{color: "white", fontSize: 16, fontWeight: "600"}}>
                                        {item}
                                    </Text>
                                    <Text style={{color: "white", fontSize: 16, fontWeight: "600"}}>
                                        100
                                    </Text>
                                </View>
                            );
                        }}
                    />
                </View>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        height: "45%",
                        borderTopEndRadius: 50,
                        borderTopStartRadius: 50,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 17,
                            textAlign: "center",
                            width: 350,
                            textTransform: "capitalize",
                            paddingVertical: 60,
                        }}
                    >
                        {t("ToggleButton")}
                    </Text>
                    <View style={{flex: 1, justifyContent: "center"}}>
                        <View style={styles.containerSwitch}>
                            <Switch
                                trackColor={{false: '#767577', true: AppColors.success}}
                                thumbColor={isWorkStatus ? '#ffffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={updateWorkStatus}
                                value={isWorkStatus}
                            />
                            <Text style={styles.switchText}>
                                Work Status
                            </Text>
                        </View>
                        <View style={[styles.containerSwitch, {top: -70}]}>
                            <Switch
                                trackColor={{false: '#767577', true: AppColors.success}}
                                thumbColor={isLinked ? '#ffffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={updateVehicleLink}
                                value={isLinked}
                            />
                            <Text style={styles.switchText}>
                                Vehicle Link
                            </Text>
                        </View>

                    </View>
                </View>
            </View>
            <FlashMessage position="bottom"/>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f1f6",
    },
    containerSwitch: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        paddingHorizontal: 0,
        top: -50,
        marginVertical: 0
    },
    switchText: {
        fontSize: 20,
        marginHorizontal: 10,
        fontWeight: "bold"
    },
    img: {
        width: 120,
        height: 120,
        borderWidth: 1,
        borderRadius: 60,
        borderColor:AppColors.secondary
    }
});
