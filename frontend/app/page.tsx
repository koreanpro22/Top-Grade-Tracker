"use client";

import { fetchUser } from "./components/dispatch";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { useGlobalContext } from "./context/store";

export default function Login() {
  const { userData, setUserData } = useGlobalContext();
  const { user, error, isLoading } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <label>
      Username:
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </label>
      <label>
      Password:
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <div className="btn">Submit</div>
      
      <div className="btn">
        <a href="/api/auth/login">Login with gmail account</a>
      </div>
    </div>
  );
}
