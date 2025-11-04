import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const authDataProvider = createContext();

const AuthProvider = ({ children }) => {
  const serverUrl = "http://localhost:8800";
  // try to initialize user from localStorage so UI updates immediately after login
  const initialUser = (() => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  })();

  const [user, setUser] = useState(initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/auth/me`, {
          withCredentials: true,
        });
        if (response.data && response.data.user) {
          setUser(response.data.user);
          setIsLoggedIn(true);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          // no valid session on server
          setUser(null);
          setIsLoggedIn(false);
          localStorage.removeItem("user");
        }
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const value = {
    serverUrl,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    loading,
  };
  return (
    <authDataProvider.Provider value={value}>
      {children}
    </authDataProvider.Provider>
  );
};
export default AuthProvider;
