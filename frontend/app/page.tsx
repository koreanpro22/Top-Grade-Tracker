"use client";

import { fetchUser } from "./components/dispatch";
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { redirect } from "next/navigation";
import { useGlobalContext } from "./context/store";

export default function Login() {
  const { userData, setUserData } = useGlobalContext();
  const { user, error, isLoading } = useUser();
  console.log('user => ', userData)
  // if (userData) redirect('/home')

  if (user) {
    async function fetchData() {
      console.log('hitting inside fetch data')
      const fetchedUser = await fetchUser(user.email);
      setUserData(fetchedUser);
      return
    }
    try {
      fetchData();
    } catch (err) {
        console.log("Error has occured => ", err);
        return err
      } 
  }

  if (isLoading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="btn ">
        <a href="/api/auth/login">Login</a>
      </div>
    </div>
  );
}
