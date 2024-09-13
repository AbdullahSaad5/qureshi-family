"use client";

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userVerified, setUserVerified] = useState(false);

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
  }, []);

  return (
    <AuthContext.Provider
      value={{ userVerified, verifyUser, logoutUser, setUserVerified }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
