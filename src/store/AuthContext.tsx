import { createContext, useState } from "react";

const AuthContext = createContext({ authToken: "", isAuthticated: false });

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");

  const value = {
    authToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
