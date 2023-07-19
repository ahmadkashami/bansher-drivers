import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {  useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FilledButton from "../components/FilledButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../api/AuthApi";
import { UserDto } from "../dtos/UserDto";
import { ErrorHandlerApi } from "../helpers/AppHelpers";
import LottieFile from "../components/ui/LottieFile";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import useAppStore from "../store/userStore";
import {emailValidator} from "../helpers/validation";

const AuthScreen = () => {
  const stateApp=useAppStore()
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function submitHandler() {
    if (!inputs.password || !inputs.email) {
      showMessage({
        message: "Error Message",
        description: "invalid inputs",
        type: "danger",
      });

      return;
    }
    if (!emailValidator(inputs.email)) {
      Alert.alert("The Email field must be a valid email");
      return;
    }

    try {
      setIsLoading(true);

      const response= await login(
          inputs.email,
          inputs.password
      );
      const driver=response.data.driver;
      const accessToken=response.data.accessToken;

      if (!driver) throw new Error("Authenticated error");

      const user = new UserDto(driver);
      AsyncStorage.setItem("token", accessToken);
      AsyncStorage.setItem("user", JSON.stringify(user));
      stateApp.setUser(user);
      stateApp.setAuthToken("token");

    } catch (error) {
      // @ts-ignore
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
          // @ts-ignore
          description: error.message,
          type: "danger",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  function inputsChangeHandler(text: string, name: string) {
    setInputs((prev) => {
      return { ...prev, [name]: text };
    });
  }
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      {isLoading && <LottieFile />}
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
            <View style={{ paddingTop: 60, paddingBottom: 0 }}>
              <Image
                style={{ width: 250, height: 200, resizeMode: "cover" }}
                source={require("../contants/images/logo.png")}
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
                  fontSize: 16,
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
                value={inputs.email}
                placeholder="Enter Email"
                placeholderTextColor={"#a4a3a8"}
                style={styles.inputs}
                onChangeText={(text) => inputsChangeHandler(text, "email")}
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                secureTextEntry
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

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 16 }}>
              if you need Help please
            </Text>
            <Text
                onPress={() => Alert.alert("help")}
                style={{ color: "dodgerblue",marginTop:10}}
            >
              Contact Help
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <FlashMessage position="top" />
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
