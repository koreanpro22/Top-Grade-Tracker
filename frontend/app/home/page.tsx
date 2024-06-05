"use client";

import NavBar from "../components/nav";
import { fetchUser } from "../components/dispatch";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { useGlobalContext } from "../context/store";
import { redirect } from "next/navigation";

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

export default function Home() {
  // const { userData, setUserData } : { userData: User, setUserData: any} = useGlobalContext();
  const { userData, setUserData } = useGlobalContext();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await fetchUser(user.email);
        setUserData(fetchedUser);
        // console.log('user logged in', user)
        console.log('fetchedUser in useEffect => ', fetchedUser)
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

  if (isLoading) return <div className="container">Loading...</div>;
  if (!user) redirect("/");
  // console.log('userData ===> ', userData)
  // console.log('user ===> ', user)
  return (
    <div className="container">
      <NavBar />
      {userData && (
        <>
          <h1>Hello, {userData.name}</h1>
          {userData.isAdmin && <div>Add Jobs</div>}
          <div>
            <div>Your Jobs</div>
            <div>
              {sortByDate(userData.job).map((job: Job) => (
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
                    {job?.client?.name} {job?.client?.phone}
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
