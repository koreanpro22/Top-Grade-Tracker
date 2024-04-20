"use client";

import NavBar from "../components/nav";

export default async function Employees() {
  // const employees = await fetch('/users/getall');
  // console.log(employees)

  async function getEmployees() {
    console.log("hitting on click");
    const res = await fetch("http://localhost:1000/users/getall");

    if (res.ok) {
      const data = res.json();
      console.log(data);
      return data;
    }
  }
  return (
    <div className="homepage-container">
      <NavBar />
      <div>All Employees</div>
      <button onClick={() => getEmployees()}>click me!</button>
    </div>
  );
}
