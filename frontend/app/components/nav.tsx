import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="nav">
      <Link href="/">Home</Link>
      {/* 
      Only for Rene
      User.id === 1" && <Link href="/jobs">Jobs</Link>
       */}
      {/* 
      Only for Rene
      <Link href="/employees">Employees</Link> */}
      {/* <Link href="/profile">Profile</Link> */}
      <a href="https://docs.google.com/document/d/1xF8LFdaAUbIQV6DRH9zluvD3vSnwKUmmyugUna9keKQ/edit?usp=sharing" download>CodeBook</a>
    </div>
  );
}
