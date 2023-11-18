import { FlatList, Image, StyleSheet, Switch, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "../contants/Colors";
import LottieFile from "../components/ui/LottieFile";
import { t } from "i18next";
import useAppStore from "../store/userStore";
import { updateDriverStatus, updateVehicleLink, updateVehiclesLocation } from "../api/AuthApi";
import { ErrorHandlerApi } from "../helpers/AppHelpers";
import FlashMessage, { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDto } from "../dtos/UserDto";
import AppActiveButton from "../components/Home/AppActiveButton";
import { VehicleDto } from "../dtos/VehicleDto";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const YOUR_TASK_NAME = 'background-location-task';
const YOUR_TIME_INTERVAL = 20000; // 2 min (adjust as needed)
const YOUR_DISTANCE_INTERVAL = 1000; // 10 meters (adjust as needed)
TaskManager.defineTask(YOUR_TASK_NAME, async ({ data, error }) => {
    if (error) {
        console.error(error)
        return
    }
    if (data) {
        // @ts-ignore
        const { locations } = data
        const location = locations[0]
        if (location) {

            const latitude = location.coords.latitude
            const longitude = location.coords.longitude
            updateVehiclesLocation({ latitude: latitude, longitude: longitude }).then(() => {
                console.log("Location in background", location.coords)
            }).catch(error => {
                console.log(error)
            })
        }
    }
})
const HomeScreen = () => {
    const stateApp = useAppStore()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isWorkStatus, setIsWorkStatus] = useState(stateApp.user.status == 'active');
    const [isLinked, setIsLinked] = useState(stateApp.vehicle.workStatus == 'online');

    const requestForegroundPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Permission to access location was denied");
            return;
        }
    }
    const requestBackgroundLocationPermission = async () => {
        const { status } = await Location.requestBackgroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Background location permission not granted!');
        }
    };
    const startBackgroundLocationUpdates = async () => {
        await Location.startLocationUpdatesAsync(YOUR_TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: YOUR_TIME_INTERVAL,
            distanceInterval: YOUR_DISTANCE_INTERVAL,
        });
    };

    useEffect(() => {
        // Request background location permissions when the component mounts
        requestForegroundPermission()
        requestBackgroundLocationPermission();

        // Start background location updates when the component mounts
        startBackgroundLocationUpdates();

    }, []);
    const updateWorkStatus = () => {
        if (!isLinked && !isWorkStatus) {
            showMessage({
                message: "Error Message",
                description: "driver should be linked to vehicle first",
                type: "danger",
            });
            return
        }
        setIsLoading(true);
        const newStatus = isWorkStatus ? 'inactive' : 'active'
        updateDriverStatus(newStatus).then((response: any) => {
            setIsWorkStatus(newStatus == "active")
            const driver = response.data.data;
            const user = new UserDto(driver);
            setIsWorkStatus(user.status == 'active')
            AsyncStorage.setItem('user', JSON.stringify(user))
            stateApp.setUser(user)
            showMessage({
                message: "Success Message",
                description: "Update Successfully to " + user.status,
                type: "success",
            });
            setIsLoading(false);
        }).catch((error: any) => {
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
    const updateLink = () => {
        setIsLoading(true);
        const newStatus = isLinked ? 'offline' : 'online'
        updateVehicleLink().then((response: any) => {

            const data = response.data.data;
            const vehicle = new VehicleDto(data);
            setIsLinked(vehicle.workStatus == 'online')
            AsyncStorage.setItem('vehicle', JSON.stringify(vehicle))
            stateApp.setVehicle(vehicle)
            showMessage({
                message: "Success Message",
                description: "Update Successfully to " + vehicle.workStatus,
                type: "success",
            });
            setIsLoading(false);
        }).catch((error: any) => {
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


    // @ts-ignore
    return (
        <View style={styles.container}>
            {isLoading && <LottieFile />}
            {/*user profile  */}
            <View style={{
                flex: 1,
                justifyContent: "flex-end",
            }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
                    <View style={{
                        borderWidth: 1,
                        borderColor: AppColors.primary,
                        width: 100, height: 100, borderRadius: 50, justifyContent: "center", alignItems: "center"
                    }}>
                        <Image
                            style={styles.img}
                            source={{ uri: stateApp.user.photo }} />
                    </View>

                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 20, color: "gray", marginBottom: 10, textTransform: "capitalize" }}>
                            {stateApp.user.name}
                        </Text>
                        <Text style={{ fontSize: 20, color: "gray" }}>
                            {stateApp.user.phoneNum}
                        </Text>
                    </View>
                </View>
                <View style={{ position: "absolute", top: 40, right: 20 }}>
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
                        data={[{ name: t("Orders"), qty: 0 }, { name: t("Completed"), qty: 0 }]}
                        horizontal
                        contentContainerStyle={{ width: "100%", flex: 1, justifyContent: "center" }}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.itemFlatList}>
                                    <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                                        {item.name}
                                    </Text>
                                    <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                                        {item.qty}
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
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <View style={styles.containerSwitch}>
                            <AppActiveButton
                                disabled={isLoading}
                                isActive={isWorkStatus}
                                onPress={updateWorkStatus}
                            />
                            <Text style={styles.switchText}>
                                {t("MapStatus")}
                            </Text>

                        </View>
                        <View style={[styles.containerSwitch]}>
                            <AppActiveButton
                                disabled={isLoading}
                                isActive={isLinked}
                                onPress={updateLink}
                            />
                            <Text style={styles.switchText}>
                                {t("VehicleLink")}
                            </Text>
                        </View>

                    </View>
                </View>
            </View>
            <FlashMessage position="bottom" />
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
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingHorizontal: 0,
        top: -50,
        marginVertical: 0
    },
    switchText: {
        fontSize: 20,
        marginHorizontal: 10,
        fontWeight: "bold"
        , textAlign: "center"
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: AppColors.secondary
    },
    itemFlatList: {
        width: 100,
        height: 100,
        marginHorizontal: 10,
        marginVertical: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "rgba(190, 221, 231,0.3)",
    }
});
