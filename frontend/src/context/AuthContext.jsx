import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  //receives the user's data and token, then updates the state.
  const login = (userData, token) => {
    setUser(userData);
    setAccessToken(token);
  };
  //clears the user's data and token.
  const logout = () => {
    setUser(null);
    setAccessToken(null);
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
