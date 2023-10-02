import React, { useEffect, useState } from "react";
import { Navbar } from "../navbar/Navbar";
import { Tutor } from "./Tutor";

export const Job = () => {
  const apiUrl = "http://localhost:5000/jobs"; // Adjust the URL as needed
  // Make a GET request to fetch jobs using the fetch API
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    // Fetch jobs data here, for example
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Update the component state with the fetched data
        setJobs(data);
        console.log(jobs);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, []);
  return (
    <div className="bg-white h-screen text-black font-poppins">
      <Navbar />
      <hr />
      <div className="flex justify-between px-20 py-4">
        <h2>All Categories</h2>
        <div>
          <ul className="flex">
            <li className="pr-4">
              <a href="#">Internship</a>
            </li>
            <li className="pr-4">
              <a href="#">Tution</a>
            </li>
            <li className="pr-4">
              <a href="#">Part-time</a>
            </li>
            <li className="">
              <a href="#">Freelancing</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="px-20 flex justify-between py-4">
        <h5 className="">Home/Services/Tution</h5>
        <div>
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="flex">
              <input
                type="search"
                id="default-search"
                className="block w-72 p-3 mr-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-indigo-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for Jobs..."
                required
              />
              <button
                type="submit"
                className="text-white right-2.5 bottom-2.5 bg-bt focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-bt"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="flex">
          <div className="pl-4">
            <h1>
              <a href="#">Sort By</a>
            </h1>
          </div>
          <div className="pl-4">
            <h1>
              <a href="#">Newest</a>
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 bg-white">
        <div className="grid-cols-1 sticky top-0 h-screen bg white pl-6">
          <div className="flex flex-col">
            <h2 className="pb-2">Salary</h2>
            <div className="flex gap-2 mb-2">
              <div>
                <h3>Minimum</h3>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input h-10 input-bordered border-2 border-slate-950 focus:border-blue-500 focus:border-2 bg-white input-accent w-full max-w-xs focus:ring-2"
                />
              </div>
              <div>
                <h3>Maximum</h3>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input h-10 input-bordered border-2 border-slate-950 focus:border-blue-500 focus:border-2 bg-white input-accent w-full max-w-xs focus:ring-2"
                />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <h3>Location</h3>
            <input
              type="text"
              placeholder="Type here"
              className="input h-10 border-2 border-slate-950 focus:border-blue-500 focus:border-2 input-bordered bg-white input-accent w-full max-w-xs focus:ring-2
              "
            />
          </div>
          <div>
            <h3>Skills</h3>
            <select
              className="w-full h-10 border-2 border-slate-950 focus:border-blue-500 focus:border-2 bg-white rounded-md max-w-xs focus:ring-2"
              data-te-select-init
              data-te-select-clear-button="true"
            >
              <option value="1">Design</option>
              <option value="2">Tution</option>
              <option value="3">UX Designer</option>
              <option value="4">UI Designer</option>
              <option value="5">Photoshop</option>
            </select>
          </div>
          <div className="btn grow bg-bt text-slate-50 mt-2">Search</div>
        </div>
        <div className="col-span-4 p-5 bg-white flex flex-wrap gap-6">
          {jobs.map((job, index) => (
            <Tutor
              key={index}
              tutor={{
                title: job.title,
                description: job.description,
                area: job.area,
                time: job.time,
                tags: job.tags,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
