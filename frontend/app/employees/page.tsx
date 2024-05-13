"use client";

import NavBar from "../components/nav";
import { useState, useEffect } from "react";
import { getAllUsers } from "../components/dispatch";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useGlobalContext } from "../context/store";
import { redirect } from "next/navigation";

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
  const { userData, setUserData } = useGlobalContext();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    async function fetchData() {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    }
    fetchData();
  }, []);

  function handleSubmit() {}

  if (isLoading) return <div className="container">Loading...</div>
  if (!user) redirect('/');

  return (
    <div className="container">
      <NavBar />
      <div>All Employees</div>

      <div className="employee-cards">
        {users &&
          users.map((user: User) => {
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
