'use client'

import NavBar from "../components/nav";
import { fetchJobs } from "../components/dispatch";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faSms } from '@fortawesome/free-solid-svg-icons';


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

  // const handleClickCall = () => {
  //   const uri = `tel:${job.client.phone}`;

  //   window.open(uri);
  // };
  // const handleClickText = () => {
  //   const uri = `sms:${job.client.phone}`;

  //   window.open(uri);
  // };

  console.log(jobs, 'jobs~~~~~~~~~~~~~~~~~');

  return (
    <div className="container">
      <NavBar />
      {jobs && (
        <>
          <div>
            <div className="text-red-500 text-3xl m-10">Your Jobs</div>
            <label className="btn btn-primary" htmlFor="modal-1">Add New Job</label>
            <input className="modal-state" id="modal-1" type="checkbox" />
            <div className="modal">
              <label className="modal-overlay" htmlFor="modal-1"></label>
              <div className="modal-content flex flex-col gap-5">
                <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                <h2 className="text-xl">Modal title 1</h2>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur dolorum voluptate ratione dicta. Maxime cupiditate, est commodi consectetur earum iure, optio, obcaecati in nulla saepe maiores nobis iste quasi alias!</span>
                <div className="flex gap-3">
                  <button className="btn btn-error btn-block">Add</button>

                  <button className="btn btn-block">Cancel</button>
                </div>
              </div>
            </div>
            <div>
              {sortByDate(jobs).map((job: Job) => (
                <Link href={`/jobs/${job.id}`} key={job.id}>
                  <div className="flex justify-between mt-8">
                    <div className="text-content2">DATE: {new Date(job.scheduledDate).toLocaleDateString()}</div>
                    <div className="text-content2">TIME: {new Date(job.scheduledDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div>
                        <div className="card-header p-4">{job.address}</div>
                      </div>
                      <div className="text-content2 flex justify-between">
                        <div>
                          {job.client.name}
                        </div>
                        <div>
                          {job.client.phone}
                        </div>
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
