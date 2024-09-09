// context/MyContext.js
"use client";
import { createContext, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
