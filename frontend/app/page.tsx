'use client'

import NavBar from "./components/nav";
import { fetchUser } from "./components/dispatch";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Job {
  id: number;
  address: string;
  description: string;
  scheduledDate: string;
  client: {
    name: string
    phone: number
  };
}


export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await fetchUser(1);
      setUser(fetchedUser);
    }
    fetchData();
  }, []);

  const sortByDate = (jobs: Job[]) => {
    return jobs.sort((a, b) => {
      return new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
    });
  };

  console.log(user, 'user~~~~~~~~~~~~~~~~~');

  return (
    <div className="container">
      <NavBar />
      {user && (
        <>
          <div>hello, {user.name}</div>
          {user.isAdmin && <div>Add Jobs</div>}
          <div>
            <div>Your Jobs</div>
            <div>
              {sortByDate(user.job).map((job: Job) => (
                <Link href={`/jobs/${job.id}`} key={job.id}>
                  <div>
                    <div>DATE: {new Date(job.scheduledDate).toLocaleDateString()}</div>
                    <div>TIME: {new Date(job.scheduledDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</div>
                    <div>{job.address}</div>
                  </div>
                  <div>
                    {job.client.name}
                    {job.client.phone}
                  </div>
                  <div>
                    {job.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
