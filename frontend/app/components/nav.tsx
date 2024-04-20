import Link from "next/link";

export default function NavBar() {
  return (
    <div className="nav-links">
      <Link href="/">Home</Link>
      <Link href="/jobs">Jobs</Link>
      <Link href="/employees">Employees</Link>
      <Link href="/profile">Profile</Link>
    </div>
  );
}
