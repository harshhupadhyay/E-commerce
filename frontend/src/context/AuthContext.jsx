import { createContext, useState } from "react";
import api, { setAccessToken as setApiAccessToken } from "../services/api";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  //receives the user's data and token, then updates the state.
  
  const login = (userData, token) => {
    setUser(userData);
    setAccessToken(token);
    setApiAccessToken(token);
  };
  //clears the user's data and token.

  const logout = async () => {
    try {
      const response = await api.post("/auth/logout");
      console.log(response.data);


    } finally {
      setUser(null);
      setAccessToken(null);
      setApiAccessToken(null);
    }
  };

  const value = {
    user,
    accessToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
