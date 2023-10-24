import React from "react";
import "./ApplicantList.css";
import { Navbar } from "../navbar/Navbar.jsx";
import Footer from "../Footer.jsx";
import { Card } from "./card";
import qh from "../Images/questionhead.png";
export const ApplicantList = () => {
  return (
    <>
      <Navbar />
      <div className="back">
        <div className="heading">
          <span className="header">Applicants for UX Design</span>
        </div>
        <div className="whole-card">
          <Card
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <Card
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <Card
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <Card
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <Card
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <Card
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <Card
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <Card
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <Card
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <Card
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <Card
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <Card
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
        </div>
        <img src={qh} className="qhead" />
      </div>
      <Footer />
    </>
  );
};

export default ApplicantList;
