'use client'

import NavBar from "../components/nav";
import { fetchUser } from "../components/dispatch";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

interface Job {
  id: number;
  address: string;
  description: string;
  scheduledDate: string;
  client: {
    name: string;
    phone: number;
  };
}


export default function Home(user: any) {

  const sortByDate = (jobs: Job[]) => {
    return jobs.sort((a, b) => {
      return (
        new Date(a.scheduledDate).getTime() -
        new Date(b.scheduledDate).getTime()
      );
    });
  };

  return (
    <div className="container">
      <a href="/api/auth/login">Login</a>
      <NavBar />
      {userInfo && (
        <>
          <h1>Hello, {userInfo.name}</h1>
          {userInfo.isAdmin && <div>Add Jobs</div>}
          <div>
            <div>Your Jobs</div>
            <div>
              {sortByDate(userInfo.job).map((job: Job) => (
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
                    {job.client.name}
                    {job.client.phone}
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