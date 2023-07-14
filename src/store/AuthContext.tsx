import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC } from "react";
import { createContext, useState } from "react";
import { UserDto } from "../dtos/UserDto";
import { IUser } from "../interfaces/UserInterface";

const userInitial = new UserDto({
  id: 0,
  name: "",
  company_id: 0,
  email: "",
  phone: "",
  truck: {
    id: 0,
    active: false,
    status: false,
    company_id: 0,
    fieldwork: "",
    lang: 0,
    lat: 0,
    user_id: 0,
  },
});
export const AuthContext = createContext({
  authToken: "",
  isAuthenticated: false,
  authenticate: (token: string) => {},
  authUser: (user: UserDto) => {},
  logout: () => {},
  user: userInitial,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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
    AsyncStorage.removeItem("user");
  }
  const value = {
    authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
    authUser,
    user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
