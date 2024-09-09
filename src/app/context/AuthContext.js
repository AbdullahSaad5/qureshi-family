"use client";

import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userVerified, setUserVerified] = useState(false);
  

  const verifyUser = () => {
    setUserVerified(true);
  };

  const logoutUser = () => {
    setUserVerified(false);
  };

  return (
    <AuthContext.Provider value={{ userVerified, verifyUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
