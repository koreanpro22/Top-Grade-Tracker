"use client";

import NavBar from "../components/nav";
import { fetchUser } from "../components/dispatch";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { useGlobalContext } from "../context/store";

interface Job {
  id: number;
  clientId: number;
  userId: number;
  description: string;
  address: string;
  scheduledDate: string;
  client: Client;
  warrenties: Warrenty[];
}

interface Warrenty {
  id: number;
  jobId: number;
  duration: number;
  createdAt: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  profilePicture: string;
  isAdmin: boolean;
  phone: string;
  job: Job[];
}

console.log();

export default function Home() {
  const { userId, setUserId, userAdmin, setUserAdmin, data, setData } = useGlobalContext();
  const [currUser, setCurrUser] = useState<User>();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await fetchUser(user.email);
        setCurrUser(fetchedUser);
        console.log('fetchedUser in useEffect => ', fetchedUser)
        setUserAdmin(fetchedUser.isAdmin);
      } catch (err) {
        console.log("Error has occured => ", err);
      }
    }
    fetchData();
  }, [user]);

  const sortByDate = (jobs: Job[]) => {
    if (!jobs || jobs.length < 2) return jobs || [];
    return jobs.sort((a, b) => {
      return (
        new Date(a.scheduledDate).getTime() -
        new Date(b.scheduledDate).getTime()
      );
    });
  };

  if (isLoading) return <div className="container">Loading...</div>

  return (
    <div className="container">
      <NavBar />
      {userAdmin ? <div>Show if admin</div> : <div>Show if not admin</div>}
      {currUser && (
        <>
          <h1>Hello, {currUser.name}</h1>
          {currUser.isAdmin && <div>Add Jobs</div>}
          <div>
            <div>Your Jobs</div>
            <div>
              {sortByDate(currUser.job).map((job: Job) => (
                <div key={job.id}>
                  <div>
                    <div>
                      DATE: {new Date(job.scheduledDate).toLocaleDateString()}
                    </div>
                    <div>
                      TIME:{" "}
                      {new Date(job.scheduledDate).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                    <div>{job.address}</div>
                  </div>
                  <div>
                    {job.client.name} {job.client.phone}
                  </div>
                  <div>{job.description}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
