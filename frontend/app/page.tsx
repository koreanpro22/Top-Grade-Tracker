"use client";

import { fetchUser } from "./components/dispatch";
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { redirect } from "next/navigation";
import { useGlobalContext } from "./context/store";

export default function Login() {
  const { userData, setUserData } = useGlobalContext();
  const { user, error, isLoading } = useUser();

  if (user) {
    async function fetchData() {
      try {
        const fetchedUser = await fetchUser(user.email);
        setUserData(fetchedUser);
      } catch (err) {
        console.log("Error has occured => ", err);
      } 
    }
    fetchData();
    redirect("/home");
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
