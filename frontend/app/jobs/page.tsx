"use client";

import NavBar from "../components/nav";
import { createJob, fetchJobs, fetchUser } from "../components/dispatch";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faSms } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useUser } from "@auth0/nextjs-auth0/client";
import { useGlobalContext } from "../context/store";



interface Job {
  id: number;
  address: string;
  description: string;
  scheduledDate: string;
  clientName: string;
  clientPhone: string
}

export default function Profile() {
  const [jobs, setJobs] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [date, setDate] = useState<any>(null)
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { userData, setUserData } = useGlobalContext();
  const { user, error, isLoading } = useUser();
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await fetchUser(user.email);
        setUserData(fetchedUser);
        console.log('user logged in', user)
        console.log('fetchedUser in useEffect => ', fetchedUser)
      } catch (err) {
        console.log("Error has occured => ", err);
      }
    }
    fetchData();
  }, [user]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
      // Format date in ISO string format
      const isoString = date.toISOString();
      setDate(isoString)
    }
  };

  const isFormValid = () => {
    return name.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && street.trim() !== "" && city.trim() !== "" && state.trim() !== "" && description.trim() !== "";
  };

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

  // const handleClickCall = () => {
  //   const uri = `tel:${job.client.phone}`;

  //   window.open(uri);
  // };
  // const handleClickText = () => {
  //   const uri = `sms:${job.client.phone}`;

  //   window.open(uri);
  // };

  const submitData = async () => {
    console.log('clicked');
    if (street === "") {
      return error
    }
    if (city === "") {
      return error
    }
    if (state === "") {
      return error
    }
    const address = `${street}, ${city}, ${state}`
    if (description === "") {
      return error
    }
    if (name === "") {
      return error
    }
    if (phone === "") {
      return error
    }
    if (date === "") {
      return error
    }
    if (email === "") {
      return error
    }
    if (date === Date.now()){
      return error
    }
    const passingData = {
      address,
      description,
      userId: 1,
      clientName: name,
      clientPhone: phone,
      scheduledDate: date,
      clientEmail: email
    };

    const res = await createJob(passingData);
    console.log('passed in', res);
  };



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
                <h2 className="text-xl">Adding Job</h2>
                <section className="bg-gray-2 rounded-xl">
                  <div className="p-8 shadow-lg">
                    <form className="space-y-4">
                      <div className="w-full">
                        <label className="sr-only" htmlFor="name">Client Name</label>
                        <input
                          className="input input-solid max-w-full"
                          placeholder="Client Name"
                          type="text"
                          id="name"
                          value={name}
                          onChange={handleNameChange}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="sr-only" htmlFor="email">Client Email</label>
                          <input
                            className="input input-solid"
                            placeholder="Client Email address"
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                          />
                        </div>

                        <div>
                          <label className="sr-only" htmlFor="phone">Client Phone</label>
                          <input
                            className="input input-solid"
                            placeholder="Client Phone Number"
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                          />
                        </div>

                        <div>
                          <label className="sr-only" htmlFor="address">Address</label>
                          <input
                            className="input input-solid"
                            placeholder="Address"
                            type="text"
                            id="address"
                            value={street}
                            onChange={handleStreetChange}
                          />
                        </div>

                        <div>
                          <label className="sr-only" htmlFor="address">City</label>
                          <input
                            className="input input-solid"
                            placeholder="City"
                            type="text"
                            id="city"
                            value={city}
                            onChange={handleCityChange}
                          />
                        </div>

                        <div>
                          <label className="sr-only" htmlFor="address">State</label>
                          <input
                            className="input input-solid"
                            placeholder="State"
                            type="text"
                            id="state"
                            value={state}
                            onChange={handleStateChange}
                          />
                        </div>
                      </div>

                      <div className="w-full">
                        <label className="sr-only" htmlFor="message">Description</label>
                        <textarea
                          className="textarea textarea-solid max-w-full"
                          placeholder="Description"
                          id="message"
                          value={description}
                          onChange={handleDescriptionChange}
                        ></textarea>
                      </div>

                      <div className="w-full">
                        <label className="sr-only" htmlFor="dateTime">Select Date and Time</label>
                        <DatePicker
                          selected={startDate}
                          onChange={handleDateChange}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="Time"
                          dateFormat="MMMM d, yyyy h:mm aa"
                          minDate={new Date()}
                          className="input input-solid"
                        />
                      </div>
                      <button onClick={submitData} className={`btn btn-error btn-block ${isFormValid() ? '' : 'disabled'}`} disabled={!isFormValid()}>Add</button>

                      <button className="btn btn-block">Cancel</button>
                    </form>
                  </div>
                </section>
              </div>
            </div>
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
                        <div>
                          {job.clientName}
                        </div>
                        <div>
                          {job.clientPhone}
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
