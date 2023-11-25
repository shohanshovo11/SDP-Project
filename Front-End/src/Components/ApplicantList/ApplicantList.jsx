import React, { useEffect, useState } from "react";
import "./ApplicantList.css";
import { Navbar } from "../navbar/Navbar.jsx";
import Footer from "../Footer.jsx";
import { Card } from "./ApplicantListCard.jsx";
import qh from "../Images/questionhead.png";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ApplicantList = () => {
  const [AppList, setAppList] = useState([]);
  const JobId = useParams().jobId;
  const [details, setDetails] = useState([]);

  async function getApplicantList() {
    const response = await axios.get(
      `http://localhost:5000/candidatelist/${JobId}`
    );
    const data = response.data;
    setAppList(data);
    // console.log(AppList);
  }

  useEffect(() => {
    getApplicantList();
  }, []);

  return (
    <>
      <Navbar />
      <div className="back">
        <div className="heading">
          <span className="header">Applicants for UX Design</span>
        </div>
        <div className="whole-card">
          {AppList.map((details, index) => (
            <Card applicant={details} key={index} />
          ))}
        </div>
        <img src={qh} className="qhead" />
      </div>
      <Footer />
    </>
  );
};

export default ApplicantList;
