import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import AppActiveButton from "../components/Home/AppActiveButton";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "../contants/Colors";
import { AuthContext } from "../store/AuthContext";
import { updateTruckStatus } from "../api/Home.Api";
import { TruckDto } from "../Dtos/user.dto";
import { TruckContext } from "../store/truckContext";
import { setStoreageValues } from "../helpers/AppAsyncStoreage";
import AppLoadingIndicator from "../components/ui/AppLoadingIndicator";

const HomeScreen = () => {
  const auth = useContext(AuthContext);
  const { truck, updateTruck } = useContext(TruckContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(truck.status);
  const [isDisabled, setisDisabled] = useState(false);
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
      console.log(error.response.data);
    } finally {
      setIsActive((prev) => !prev);
      setIsLoading(false);

      setTimeout(() => {
        setisDisabled(false);
      }, 2000);
    }
  }
  return (
    <View style={styles.container}>
      {isLoading && <AppLoadingIndicator />}
      <View style={{ position: "absolute", top: 40, right: 20 }}>
        <Ionicons
          onPress={auth.logout}
          name="log-out-outline"
          size={30}
          color={AppColors.black}
        />
      </View>
      <View style={{ position: "absolute", top: 70 }}>
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
      </View>
      <View
        style={{
          flex: 1,
          paddingVertical: 100,
          justifyContent: "flex-end",
        }}
      >
        <AppActiveButton
          disabled={isDisabled}
          isActive={isActive}
          onPress={buttonPressHnalder}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f4f1f6",
  },
});
