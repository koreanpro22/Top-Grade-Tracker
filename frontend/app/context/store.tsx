"use client";

import React from "react";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type DataType = {
  firstName: string;
};

interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  userAdmin: boolean;
  setUserAdmin: Dispatch<SetStateAction<boolean>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
}

const GlobalContext = createContext<ContextProps>({
  userId: "",
  setUserId: (): string => "",
  userAdmin: false,
  setUserAdmin: (): boolean => false,
  data: [],
  setData: (): DataType[] => [],
});

export const GlobalContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userAdmin, setUserAdmin] = useState(false);
  const [data, setData] = useState<[] | DataType[]>([]);

  return (
    <GlobalContext.Provider
      value={{ userId, setUserId, userAdmin, setUserAdmin, data, setData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
