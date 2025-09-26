// UserContext.tsx
"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  username: string;
  salary: number;
  balance: number;
}

interface UserContextType {
  userDetails: User;
  setUserDetails: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<User>({
    username: " ",
    salary: 0,
    balance: 0,
  });

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
