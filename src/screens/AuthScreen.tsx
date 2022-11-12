import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FilledButton from "../components/FilledButton";

const AuthScreen = () => {
  const [inputs, setInputs] = useState({ phone: "", password: "" });
  function submitHandler() {
    if (!inputs.password || !inputs.phone) {
      Alert.alert("invalid inputs");
      return;
    }
  }
  function inputsChangeHandler(text: string, name: string) {
    setInputs((prev) => {
      return { ...prev, [name]: text };
    });
  }
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: 16,
              alignSelf: "center",
            }}
          >
            <View style={{ paddingTop: 50, paddingBottom: 10 }}>
              <Image
                style={{ width: 250, height: 200, resizeMode: "cover" }}
                source={require("../contants/images/login.png")}
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 25,
                  fontWeight: "600",
                  letterSpacing: 2,
                  textAlign: "center",
                }}
              >
                Hello Again !
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  width: 300,
                  textAlign: "center",
                  fontSize: 19,
                  letterSpacing: 4,
                  marginTop: 8,
                  textTransform: "capitalize",
                }}
              >
                Welcome Back you've been missed!
              </Text>
            </View>

            {/* <View style={styles.innerContainer}> */}
            <View style={styles.inputBox}>
              <TextInput
                value={inputs.phone}
                placeholder="Enter Phone"
                keyboardType="number-pad"
                placeholderTextColor={"#a4a3a8"}
                style={styles.inputs}
                onChangeText={(text) => inputsChangeHandler(text, "phone")}
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                value={inputs.password}
                placeholder="Enter Password"
                placeholderTextColor={"#a4a3a8"}
                style={styles.inputs}
                onChangeText={(text) => inputsChangeHandler(text, "password")}
              />
            </View>
            <Pressable
              style={({ pressed }) => [
                {
                  alignSelf: "flex-end",
                  flex: 1,
                },
                pressed && { opacity: 0.3 },
              ]}
            >
              <Text
                style={{
                  marginRight: 20,
                  marginVertical: 15,
                }}
              >
                Recovery Password
              </Text>
            </Pressable>
            <View style={{ paddingVertical: 20 }}>
              <FilledButton onPress={submitHandler}>Submit</FilledButton>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f1f6" },
  innerContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    backgroundColor: "white",
    width: "90%",
    height: 60,
    padding: 16,
    marginVertical: 10,
    borderRadius: 10,
  },
  inputs: { flex: 1, fontSize: 16, fontWeight: "600" },
});
