"use client";

import NavBar from "../components/nav";
import { fetchJobs } from "../components/dispatch";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useGlobalContext } from "../context/store";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faSms } from '@fortawesome/free-solid-svg-icons';


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

export default function Profile() {
  const [jobs, setJobs] = useState<any>(null);
  const { userData, setUserData } = useGlobalContext();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    async function fetchData() {
      const fetchedJobs = await fetchJobs();
      setJobs(fetchedJobs);
    }
    fetchData();
  }, []);

  const sortByDate = (jobs: Job[]) => {
    return jobs.sort((a, b) => {
      return (
        new Date(a.scheduledDate).getTime() -
        new Date(b.scheduledDate).getTime()
      );
    });
  };

  console.log(jobs, 'jobs~~~~~~~~~~~~~~~~~');

  return (
    <div className="container">
      <NavBar />
      {jobs && (
        <>
          <div>
            <div className="text-red-500 text-3xl m-10">All Jobs</div>
            <div>
              {sortByDate(jobs).map((job: Job) => (
                <Link href={`/jobs/${job.id}`} key={job.id}>
                  <div className="flex justify-between mt-8">
                    <div className="text-content2">
                      DATE: {new Date(job.scheduledDate).toLocaleDateString()}
                    </div>
                    <div className="text-content2">
                      TIME:{" "}
                      {new Date(job.scheduledDate).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div>
                        <div className="card-header p-4">{job.address}</div>
                      </div>
                      <div className="text-content2 flex justify-between">
                        <div>{job.client.name}</div>
                        <div>{job.client.phone}</div>
                      </div>
                      <div className="text-content2 flex justify-left">
                        <div>
                          <h3>
                            Description:
                          </h3>
                          <div className="text-content3">
                            {job.description}
                          </div>
                        </div>
                      </div>
                    </div>
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
