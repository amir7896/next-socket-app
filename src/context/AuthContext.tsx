"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { loginUser, registerUser } from "../services/authService";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  role: string;
  user: User | null;
  login: (response: { token: string; user: User }) => void;
  logout: () => void;
  loginWithCredentials: (data: {
    email: string;
    password: string;
  }) => Promise<void>;
  registerWithCredentials: (data: {
    username: string;
    email: string;
    password: string;
    role: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  role: "guest",
  user: null,
  login: () => {},
  logout: () => {},
  loginWithCredentials: async () => {},
  registerWithCredentials: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string>("guest");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      try {
        const decoded: any = jwtDecode(storedToken);
        setRole(decoded.role || "guest");
      } catch {
        setRole("guest");
      }
    }
  }, []);

  const login = (response: { token: string; user: User }) => {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    setToken(response.token);
    setUser(response.user);
    try {
      const decoded: any = jwtDecode(response.token);
      setRole(decoded.role || "guest");
    } catch {
      setRole("guest");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setRole("guest");
    setUser(null);
  };

  const loginWithCredentials = async (data: {
    email: string;
    password: string;
  }) => {
    const res = await loginUser(data);
    login(res);
  };

  const registerWithCredentials = async (data: {
    username: string;
    email: string;
    password: string;
    role: string;
  }) => {
    await registerUser(data);
  };

  console.log("User:", user);
  console.log("token:", token);
  console.log("role:", role);

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        user,
        login,
        logout,
        loginWithCredentials,
        registerWithCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
