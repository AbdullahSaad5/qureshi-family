"use client";

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userVerified, setUserVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const verifyUser = () => {
    setUserVerified(true);
  };

  const logoutUser = () => {
    setUserVerified(false);
  };

  useEffect(() => {
    const userId =
      typeof window !== "undefined" && localStorage.getItem("userId");
    if (userId) {
      verifyUser();
    } else {
      setUserVerified(false);
    }
    const admin =
      typeof window !== "undefined" && localStorage.getItem("isAdmin");
    console.log("admin inside use effect");
    console.log(admin);
    if (admin) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userVerified,
        verifyUser,
        logoutUser,
        setUserVerified,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
