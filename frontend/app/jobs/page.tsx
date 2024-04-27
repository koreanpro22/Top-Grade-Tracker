'use client'

import NavBar from "../components/nav";
import { fetchJobs } from "../components/dispatch";
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
  const [jobs, setJobs] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedJobs = await fetchJobs();
      setJobs(fetchedJobs);
    }
    fetchData();
  }, []);

  const sortByDate = (jobs: Job[]) => {
    return jobs.sort((a, b) => {
      return new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
    });
  };

  console.log(jobs, 'jobs~~~~~~~~~~~~~~~~~');

  return (
    <div className="container">
      <NavBar />
      {jobs && (
        <>
          <div>
            <div>Your Jobs</div>
            <div>
              {sortByDate(jobs).map((job: Job) => (
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
