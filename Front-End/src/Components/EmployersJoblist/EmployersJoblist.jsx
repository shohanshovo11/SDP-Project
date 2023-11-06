import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import { Axios } from "../api/api";
import "./EmployersJoblist.css";
import { Navbar } from "../navbar/Navbar";
import joblist from "./img/joblist.png";
import line1 from "./img/line-97.svg";
import vector from "./img/vector.svg";

import Footer from "../Footer";
import { JobItem } from "./JobItem";

export const EmployersJoblist = () => {
  const tokenAvailable = !!localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const apiUrl = "/employers-joblist"; // Adjust the URL as needed

  const [records, setRecords] = useState([]);

  useEffect(() => {
    setLoading(true);

    Axios.get(apiUrl)
      .then((response) => {
        const data = response.data;

        setRecords(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full bg-white">
          <Dna
            visible={true}
            height={150}
            width={150}
            ariaLabel="dna-loading"
            className="text-center"
          />
        </div>
      ) : (
        <div className="posted-joblist">
          <div className="div">
            <img className="line" alt="Line" src={line1} />

            <div className="text-wrapper-22">Posted Job List</div>
            <img
              className="element-error-with"
              alt="Element error with"
              src={joblist}
            />

            <div className="frame-2">
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
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};
