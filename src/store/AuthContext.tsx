import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  authToken: "",
  isAuthticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");

  function authenticate(token: string) {
    console.log("token", { authToken });

    setAuthToken(token);
    // AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken("");
    AsyncStorage.removeItem("token");
  }
  const value = {
    authToken,
    isAuthticated: !!authToken,
    authenticate,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
