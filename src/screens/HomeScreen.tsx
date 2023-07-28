import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppActiveButton from "../components/Home/AppActiveButton";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "../contants/Colors";
import LottieFile from "../components/ui/LottieFile";
import { t } from "i18next";
import useAppStore from "../store/userStore";
import {updateUserStatus} from "../api/AuthApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserDto} from "../dtos/UserDto";

const HomeScreen = () => {
    const stateApp=useAppStore()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(stateApp.user?.status);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsActive(stateApp.user?.status);
  }, [stateApp.user]);
  async function buttonPressHandler() {
      setIsDisabled(true);
    setIsLoading(true);
    try {
       const response = await updateUserStatus("offline",{});
       console.log(response)
        setIsActive(!isActive)
    } catch (error) {
      // @ts-ignore
        console.log(error.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
          setIsDisabled(false);
      }, 1000);
    }
  }
    return (
    <View style={styles.container}>
      {isLoading && <LottieFile />}
        {/*user profile  */}
      <View  style={{
          flex: 1,
          justifyContent: "flex-end",
        }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../contants/images/profile.png")}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 20, color: "gray", marginBottom: 10 }}>
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
            backgroundColor: AppColors.primary,
            height: 220,
            borderTopEndRadius: 50,
            borderTopStartRadius: 50,
            bottom: -80,
            alignItems: "center",
          }}
        >
          <FlatList
            data={["orders", "requests"]}
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
          {/*<Text*/}
          {/*  style={{*/}
          {/*    fontSize: 16,*/}
          {/*    color: "gray",*/}
          {/*    textAlign: "center",*/}
          {/*    textTransform: "capitalize",*/}
          {/*    width: "80%",*/}
          {/*    paddingVertical: 5,*/}
          {/*    top: -10,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {t("InCaseOffline")}*/}
          {/*</Text>*/}
          {/*<AppActiveButton*/}
          {/*  disabled={isDisabled}*/}
          {/*  isActive={!!isActive}*/}
          {/*  onPress={buttonPressHandler}*/}
          {/*/>*/}
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
