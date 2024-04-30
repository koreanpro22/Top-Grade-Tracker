"use client";

import { fetchUser } from "./components/dispatch";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import React from "react";
import { redirect } from "next/navigation";

export default function Login() {
  const { user, error, isLoading } = useUser();

  if (user) {
    redirect("/home");
  }

  if (isLoading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <a href="/api/auth/login">Login</a>
    </div>
  );
}
