"use client";

import NavBar from "./components/nav";
import { fetchUser } from "./components/dispatch";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

interface Job {
  id: number;
  address: string;
  description: string;
  scheduledDate: string;
  client: {
    name: string;
    phone: number;
  };
}

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [currUser, setCurrUser] = useState();

  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await fetchUser(user.email);
      setCurrUser(fetchedUser)
    }
    fetchData();

  }, [])

  const sortByDate = (jobs: Job[]) => {
    return jobs.sort((a, b) => {
      return (
        new Date(a.scheduledDate).getTime() -
        new Date(b.scheduledDate).getTime()
      );
    });
  };
  
  if (isLoading) return <div>Loading...</div>;

  console.log(user.email, "user~~~~~~~~~~~~~~~~~");


  return user ? <div>Home without user</div> : <div>Home with user</div>;
}
