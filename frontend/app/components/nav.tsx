import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../context/store";

export default function NavBar() {

  const { userData } = useGlobalContext();

  // type userData = any
  console.log(userData)

  return (
    <div className="nav">
      <input type="checkbox" id="drawer-left" className="drawer-toggle" />

      <label htmlFor="drawer-left" className="btn btn-primary">
        <FontAwesomeIcon icon={faBars} />
      </label>
      <label className="overlay" htmlFor="drawer-left"></label>
      <div className="drawer">
        <div className="drawer-content pt-10 flex flex-col h-full gap-4">
          <Link href="/">Home</Link>
          {userData.isAdmin && <Link href="/employees">Employees</Link>}
          {userData.isAdmin && <Link href="/jobs">All Jobs</Link>}
          <a
            href="https://docs.google.com/document/d/1xF8LFdaAUbIQV6DRH9zluvD3vSnwKUmmyugUna9keKQ/edit?usp=sharing"
            download
          >
            CodeBook
          </a>
          <label
            htmlFor="drawer-left"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="h-full flex flex-row justify-center items-end">
            <div className="btn btn-lg w-full bg-red-500" onClick={() => console.log('hitting logout')}>
              <a href="/api/auth/logout">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
