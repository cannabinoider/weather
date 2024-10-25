"use client"; 

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextProps {
  email: string;
  city: string;
  setEmail: (email: string) => void;
  setCity: (city: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");

  return (
    <AppContext.Provider value={{ email, city, setEmail, setCity }}>
      {children}
    </AppContext.Provider>
  );
};
