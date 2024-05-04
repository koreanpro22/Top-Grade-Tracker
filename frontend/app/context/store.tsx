"use client";

import React from "react";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface Job {
  id: number;
  clientId: number;
  userId: number;
  description: string;
  address: string;
  scheduledDate: string;
  client: Client;
  warrenties: Warrenty[];
}

interface Warrenty {
  id: number;
  jobId: number;
  duration: number;
  createdAt: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}


type DataType = {
  name: string;
  email: string;
  profilePicture: string;
  phone: string;
  id: number;
  isAdmin: boolean;
  jobs: Job[];
};

interface ContextProps {
  userData: DataType[];
  setUserData: Dispatch<SetStateAction<DataType[]>>;
}

const GlobalContext = createContext<ContextProps>({
  userData: [],
  setUserData: (): DataType[] => [],
});

export const GlobalContextProvider = ({ children }) => {
  const [userData, setUserData] = useState<[] | DataType[]>([]);

  return (
    <GlobalContext.Provider
      value={{ userData, setUserData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
