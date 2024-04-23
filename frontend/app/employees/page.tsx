"use client";

import NavBar from "../components/nav";
import { useState, useEffect } from "react";
import { getAllUsers } from "../components/dispatch";

interface User {
  id: number;
  name: string;
  email: string;
  profilePicture: string;
  isAdmin: boolean;
  phone: string;
}

export default function Employees() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers)
    }
    fetchData();
  }, []);

  function handleSubmit() {}

  return (
    <div className="container">
      <NavBar />
      <div>All Employees</div>

      <div className="employee-cards">
        {users && users.map((user: User) => {
          return (
            <div className="single-employee-card" key={user.id}>
              <p>{user.name}</p>
              {user.profilePicture ? (
                <img src={user.profilePicture}></img>
              ) : (
                <img
                  style={{ width: "40px" }}
                  src="https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid"
                ></img>
              )}
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </div>
          );
        })}
      </div>
      <div>Add Employee</div>
      <form className="add-employee-form-container">
        <input></input>
      </form>
    </div>
  );
}
