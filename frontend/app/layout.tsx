import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import React from "react";
import { GlobalContextProvider } from "./context/store";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Top Grade Tracker",
  description: "Tracking app for TGT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </body>
      </UserProvider>
    </html>
  );
}
