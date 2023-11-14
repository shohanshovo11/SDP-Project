import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import { Axios } from "../api/api";
import axios from "axios";
import "./EmployersJoblist.css";
import { Navbar } from "../navbar/Navbar";
import { NavNolog } from "../navbar/NavNolog";
import { JobItem } from "./JobItem";
import Footer from "../Footer";
import joblist from "./img/joblist.png";
import line1 from "./img/line-97.svg";

export const EmployersJoblist = () => {
  const tokenAvailable = !!localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const email = "shovo@gmail.com"; //localStorage.getItem("email");

  const apiUrl = "/employers-joblist"; // Adjust the URL as needed

  const [records, setRecords] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/employers-joblist/${email}`)
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
      {tokenAvailable ? <Navbar /> : <NavNolog />}
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
      <Footer />
    </>
  );
};
