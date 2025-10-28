import React, { createContext, useContext, useState, useEffect } from "react";
import { setToken } from "../auth";
import { setLogout } from "../auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(null);
  const [user, setUser] = useState(null);

  const login = data => {
    setIsLogin(data?.user?.token);
    setToken(data?.user?.token);
    setUser(data?.user);
    localStorage.setItem("user", JSON.stringify(data?.user));
  };

  const logout = () => {
    setIsLogin(null);
    setUser(null);
    setLogout();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLogin(token);

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLogin, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
