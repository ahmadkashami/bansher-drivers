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
import { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FilledButton from "../components/FilledButton";
import { AuthContext } from "../store/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "../api/axios.config";
import { login } from "../api/Auth.api";
import { UserDto } from "../Dtos/user.dto";
import { ErrorHandlerApi } from "../helpers/AppHelpers";
import LottieFile from "../components/ui/LottieFile";

const AuthScreen = () => {
  const auth = useContext(AuthContext);
  const [inputs, setInputs] = useState({ phone: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function submitHandler() {
    if (!inputs.password || !inputs.phone) {
      Alert.alert("invalid inputs");
      return;
    }
    if (inputs.phone.length < 8) {
      Alert.alert("phone must be at least 8 digits");
      return;
    }

    try {
      setIsLoading(true);
      const phoneWithCode = "965" + inputs.phone;
      const { access_token, data } = await login(
        phoneWithCode,
        inputs.password
      );
      const user = new UserDto(data);
      AsyncStorage.setItem("token", access_token);
      AsyncStorage.setItem("user", JSON.stringify(user));
      auth.authUser(user);
      auth.authenticate("token");
    } catch (error) {
      ErrorHandlerApi(error);
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
              - if you neeed Help please{" "}
              <Text
                onPress={() => Alert.alert("help")}
                style={{ color: "dodgerblue" }}
              >
                Contact Help
              </Text>
              -
            </Text>
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
