import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenView from "../components/ui/ScreenView";
import { Ionicons } from "@expo/vector-icons";
import ButtonsProfile from "../components/Profile/Buttons.profile";

const ProfileScreen = () => {
  return (
    <ScreenView>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>profile pic</Text>
          <Text style={{ fontSize: 30 }}>phone number</Text>
        </View>
        <View style={{ flex: 2, padding: 16 }}>
          <ButtonsProfile title={"My Membership"} />
          <ButtonsProfile title={"Contact Us "} />
          <ButtonsProfile title={"Privacy And Policy"} />
          <ButtonsProfile title={"Languages"} />
          <ButtonsProfile title={"Log out"} />
        </View>
      </View>
    </ScreenView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
