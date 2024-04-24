'use client'

import { useEffect, useState } from "react";
import NavBar from "../components/nav";
import { fetchJob } from "../components/dispatch";


export default function Jobs() {

  const [job, setJob] = useState<any>(null)

  useEffect(() => {
    async function fetchData(){
      const fetchedJob = await fetchJob(2)
      setJob(fetchedJob)
    }
    fetchData()
  },[])

  console.log(job, 'jobs+++++++++++++++');
  return (
    <div className="container">
      <NavBar />
      <div>
        <div>
        </div>
      </div>
    </div>
  );
}
