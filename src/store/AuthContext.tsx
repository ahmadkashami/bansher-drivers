import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { UserDto } from "../Dtos/user.dto";
// import { IUser } from "../interfaces/User.interface";

export const AuthContext = createContext({
  authToken: "",
  isAuthticated: false,
  authenticate: (token: string) => {},
  authUser: (user: UserDto) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState<string>("");
  const [user, setUser] = useState<UserDto | null>(null);

  function authUser(user: UserDto) {
    setUser(user);
  }
  function authenticate(token: string) {
    setAuthToken(token);
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
    authUser,
    user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
