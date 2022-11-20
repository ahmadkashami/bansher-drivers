import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import AppActiveButton from "../components/Home/AppActiveButton";
import { Ionicons } from "@expo/vector-icons";
import shallow from "zustand/shallow";

import { t } from "i18next";
import * as Location from "expo-location";

import { AppColors } from "../contants/Colors";
import { AuthContext } from "../store/AuthContext";
import { updateTruckStatus } from "../api/Home.Api";
import { TruckDto } from "../Dtos/user.dto";
import { setStoreageValues } from "../helpers/AppAsyncStoreage";
import LottieFile from "../components/ui/LottieFile";

import AppMapView from "../components/Home/AppMapView";
import { LOCATION_TASK_NAME } from "../services/LocationTask";
import { useTruckStore } from "../store/truck.zustand";
import { Region } from "../interfaces/types";

const HomeScreen = () => {
  const [status, requestPermission] = Location.useBackgroundPermissions();
  const auth = useContext(AuthContext);
  // const { truck, updateTruck } = useContext(TruckContext);
  const { truck, updateTruck } = useTruckStore(
    (state) => ({
      truck: state.truck,
      updateTruck: state.updateTruck,
    }),
    shallow
  );
  const reagonRef = useRef<Region | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(truck?.status);
  const [isDisabled, setisDisabled] = useState(false);
  console.log(truck);

  useEffect(() => {
    if (truck?.location.lat && truck?.location.long) {
      reagonRef.current = {
        latitude: truck.location.lat,
        longitude: truck.location.long,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      };
    }
    setIsActive(truck?.status);
  }, [truck]);

  const requestPermissions = async () => {
    const { status } = await requestPermission();
    console.log({ status });
    console.log("hello");

    if (status === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        showsBackgroundLocationIndicator: true,
        deferredUpdatesInterval: 5,
        timeInterval: 5000,
      });
    }
  };

  async function buttonPressHnalder() {
    setisDisabled(true);
    setIsLoading(true);
    try {
      const response = await updateTruckStatus(truck.id);
      const updatedTruck = new TruckDto(response.data);
      auth.user.truck = updatedTruck;
      setStoreageValues("user", JSON.stringify(auth.user));
      updateTruck(updatedTruck);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setisDisabled(false);
      }, 1000);
    }
  }
  return (
    <View style={styles.container}>
      {isLoading && <LottieFile />}
      <View style={{ position: "absolute", top: 40, right: 20 }}>
        <Ionicons
          onPress={auth.logout}
          name="log-out-outline"
          size={30}
          color={AppColors.black}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <AppMapView reagon={reagonRef.current} />

        <View
          style={{
            backgroundColor: AppColors.primary,
            height: 220,
            borderTopEndRadius: 50,
            borderTopStartRadius: 50,
            bottom: -80,
            alignItems: "center",
          }}
        >
          <FlatList
            data={["orders", "requests", "talabats", "bson"]}
            horizontal
            contentContainerStyle={{ width: "85%" }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    marginHorizontal: 10,
                    marginVertical: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                    backgroundColor: "rgba(190, 221, 231,0.3)",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "600" }}
                  >
                    {item}
                  </Text>
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "600" }}
                  >
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
              fontSize: 25,
              textAlign: "center",
              width: 350,
              textTransform: "capitalize",
              paddingVertical: 15,
              top: -20,
            }}
          >
            {t("ToggleButton")}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "gray",
              textAlign: "center",
              textTransform: "capitalize",
              width: "80%",
              paddingVertical: 5,
              top: -10,
            }}
          >
            {t("IncaseOffline")}
          </Text>
          <AppActiveButton
            disabled={isDisabled}
            status={truck?.status}
            onPress={buttonPressHnalder}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f1f6",
  },
});
