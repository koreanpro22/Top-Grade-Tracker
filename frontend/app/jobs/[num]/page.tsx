"use client";

import { useEffect, useState } from "react";
import NavBar from "../../components/nav";
import { fetchJob } from "../../components/dispatch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faSms } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useGlobalContext } from "@/app/context/store";
import { redirect } from "next/navigation";

import * as dotenv from "dotenv";

dotenv.config();

const loadScript = (url: string, callback: () => void) => {
  const existingScript = document.querySelector(`script[src="${url}"]`);
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
  }
  if (existingScript && callback) callback();
};

const Jobs = ({ params }: { params: { num: number } }) => {
  const [job, setJob] = useState<any>(null);
  const { userData, setUserData } = useGlobalContext();
  const { user, error, isLoading } = useUser();
  const { num } = params;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJob = await fetchJob(num);
      setJob(fetchedJob);
    };
    fetchData();
  }, [num]);
  const YOUR_API_KEY: string = process.env.REACT_APP_YOUR_API_KEY as string;

  console.log(YOUR_API_KEY, "api key");
  console.log(process.env, "process dotenv");
  console.log(job);
  useEffect(() => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyDnKEeDUQ_wf2JhICaZYoSSzYi8SlaeaDI&libraries=places`, () => {
    });
  }, []);

  if (isLoading) return <div className="container">Loading...</div>;
  if (!user) redirect("/");

  return (
    <div className="container">
      <NavBar />
      <div>
        <div>{job && <StreetViewPage job={job} />}</div>
      </div>
    </div>
  );
};

interface StreetViewPageProps {
  job: any;
}


const StreetViewPage: React.FC<StreetViewPageProps> = ({ job }) => {

  useEffect(() => {
    if (!window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: job.address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const position = results[0].geometry.location;

        const streetViewPano = document.getElementById("street-view-pano");
        if (!streetViewPano) return;

        const panorama = new window.google.maps.StreetViewPanorama(streetViewPano, {
          position: position,
          pov: { heading: 165, pitch: 1 },
          zoom: 1,
          disableDefaultUI: true,
        });
      } else {
        console.error(
          "Geocode was not successful for the following reason: ",
          status
        );
      }
    });
  }, [job]);

  const handleClickCall = () => {
    const uri = `tel:${job.clientPhone}`;

    window.open(uri);
  };
  const handleClickText = () => {
    const uri = `sms:${job.clientPhone}`;

    window.open(uri);
  };
  const handleDirection = () => {
    const address = encodeURIComponent(job.address);
    const uri = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    window.open(uri, "_blank");
  }





  return (
    <div className="p-10 w-full" style={{ width: "100vw" }}>
      <div className="text-red-100 text-xs mb-5">{job.address}</div>
      <div className="rounded border-opacity-5 shadow-outline" id="street-view-pano" style={{ width: "100%", height: "300px" }}></div>
      <div className="mt-8">
        Description
      </div>
      <div className="mb-5">
        {job.description}
      </div>
      <div>
          Warrenty Duration:
          {" "}
          {job.warrenties[0]?.duration ? job.warrenties[0].duration : "Add Warrenty"}
      </div>
      <div className="flex justify-between">
        <div>
          {job.clientName}
        </div>
        <div className="flex">
          <button onClick={handleClickCall} className="mr-6">
            <FontAwesomeIcon icon={faPhone} />
          </button>
          <button onClick={handleClickText}>
            <FontAwesomeIcon icon={faSms} />
          </button>
        </div>
      </div>
      <button onClick={handleDirection}>Directions</button>
    </div>
  );
};

export default Jobs;
