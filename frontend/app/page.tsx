"use client";

import { useRouter } from "next/navigation";
import NavBar from "./components/nav";

export default function Home() {
  const router = useRouter();
  async function navigateTo(path: string) {
    router.push(path);
  }

  return (
    <div className="homepage-container">
      <NavBar />

      <button
        onClick={(e) => {
          e.preventDefault();
          navigateTo("/");
        }}
      >
        Home
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigateTo("/jobs");
        }}
      >
        Jobs
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigateTo("/employees");
        }}
      >
        Employees
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigateTo("/profile");
        }}
      >
        Profile
      </button>
    </div>
  );
}
