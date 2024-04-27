'use client'

import { useEffect, useState } from "react";
import NavBar from "../../components/nav";
import { fetchJob } from "../../components/dispatch";

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

const Jobs = ({
  params,
}: {
  params: { num: number }
}) => {
  const [job, setJob] = useState<any>(null);
  const { num } = params;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJob = await fetchJob(num);
      setJob(fetchedJob);
    };
    fetchData();
  }, [num]);
  const YOUR_API_KEY: string = process.env.REACT_APP_YOUR_API_KEY as string;

  console.log(YOUR_API_KEY, 'api key');
  console.log(process.env, 'process dotenv');
  console.log(job);
  useEffect(() => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&libraries=places`, () => {
    });
  }, []);

  return (
    <div className="container">
      <NavBar />
      <div>
        <div>
          {job && <StreetViewPage job={job} />}
        </div>
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
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
          disableDefaultUI: true,
        });
      } else {
        console.log(job);
        console.error("Geocode was not successful for the following reason: ", status);
      }
    });
  }, [job]);

  const handleClickCall = () => {
    const uri = `tel:${job.client.phone}`;

    window.open(uri);
  };
  const handleClickText = () => {
    const uri = `sms:${job.client.phone}`;

    window.open(uri);
  };


  return (
    <div>
      <h1>{job.address}</h1>
      <div id="street-view-pano" style={{ width: "100%", height: "300px" }}></div>
      <div>
        {job.description}
      </div>
      <div>
        <div>
          {job.client.name}
        </div>
        <button onClick={handleClickCall}>
          call
        </button>
        <button onClick={handleClickText}>
          text
        </button>
      </div>
      <button>Copy Address</button>
    </div>
  );
};


export default Jobs;
