import { createContext, useEffect, useState } from "react";
import api, { setAccessToken as setApiAccessToken } from "../services/api";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user has an active session on initial load/refresh
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.post("/auth/refresh");
        const { user: userData, accessToken: token } = response.data.data;
        setUser(userData);
        setAccessToken(token);
        setApiAccessToken(token);

      } catch (error) {
        setUser(null);
        setAccessToken(null);
        setApiAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // receives the user's data and token, then updates the state.
  const login = (userData, token) => {
    setUser(userData);
    setAccessToken(token);
    setApiAccessToken(token);
  };

  // clears the user's data and token.
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
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
