import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppActiveButton from "../components/Home/AppActiveButton";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "../contants/Colors";
import { AuthContext } from "../store/AuthContext";
import { updateTruckStatus } from "../api/Home.Api";
import { TruckDto } from "../Dtos/user.dto";
import { TruckContext } from "../store/truckContext";
import { setStoreageValues } from "../helpers/AppAsyncStoreage";
import LottieFile from "../components/ui/LottieFile";
import { t } from "i18next";

const HomeScreen = () => {
  const auth = useContext(AuthContext);
  const { truck, updateTruck } = useContext(TruckContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(truck?.status);
  const [isDisabled, setisDisabled] = useState(false);

  useEffect(() => {
    setIsActive(truck?.status);
  }, [truck]);
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
      {/* <View style={{ position: "absolute", top: 70 }}>
        <View style={{ marginVertical: 40 }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              width: 350,
              textTransform: "capitalize",
            }}
          >
            toggle the button to change your status
          </Text>
          <View style={{ alignSelf: "center" }}>
            <Image
              style={{ resizeMode: "contain", width: 300, height: 300 }}
              source={require("../contants/images/togglePic.png")}
            ></Image>
          </View>
        </View>
      </View> */}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../contants/images/profile.png")}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 20, color: "gray", marginBottom: 10 }}>
              {auth.user.name}
            </Text>
            <Text style={{ fontSize: 20, color: "gray" }}>
              {auth.user.phone}
            </Text>
          </View>
        </View>
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
            data={["orders", "requests", "talabats"]}
            horizontal
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
              paddingVertical: 5,
              top: -10,
            }}
          >
            {t("IncaseOffline")}
          </Text>
          <AppActiveButton
            disabled={isDisabled}
            isActive={isActive}
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
