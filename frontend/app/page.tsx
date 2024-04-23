"use client";

import { useRouter } from "next/navigation";
import NavBar from "./components/nav";

export default function Home() {
  const router = useRouter();
  async function navigateTo(path: string) {
    router.push(path);
  }

  return (
    <div className="container">
      <NavBar />
      <div className="homepage-container"></div>
    </div>
  );
}
