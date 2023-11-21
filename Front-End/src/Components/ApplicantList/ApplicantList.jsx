import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import { Axios } from "../api/api";
import { JobItem } from "./JobItem";
import "./ApplicantList.css";

export const ApplicantList = () => {
  const tokenAvailable = !!localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("email");

  const apiUrl = "/employers-joblist"; // Adjust the URL as needed

  const [records, setRecords] = useState([]);

  useEffect(() => {
    setLoading(true);
    Axios.get(`/employers-joblist/${email}`)
      .then((response) => {
        const data = response.data;
        setRecords(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  });
  return (
    <>
      <div className="h-full w-full flex flex-row gap-x-8 px-4 py-4 font-poppins overflow-x-hidden">
        {records.map((job, index) => (
          <JobItem
            key={index}
            jobitem={{
              title: job.title,
              tags: job.tags,
              salary: job.salary,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ApplicantList;
