"use client";

import { createContext, useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userGlobal, setUserGlobal] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const API = await axiosInstance.get("/users/get-user");
        setUserGlobal(API.data.user);
      } else {
        setUserGlobal(null);
      }
    } catch (error) {
      console.log("Error decoding token or fetching user data:");
      setUserGlobal(null);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUserData();
  };

  const register = async (token) => {
    localStorage.setItem("token", token);
    await fetchUserData();
  }

  return (
    <UserContext.Provider value={{ UserInfo: userGlobal, setUserGlobal, login, register }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
