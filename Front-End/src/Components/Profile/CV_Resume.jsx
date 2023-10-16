import React from "react";
import { Navbar } from './../navbar/Navbar';
import "./CVstyle.css";
import cvUpload  from "./assets/cv_resume/vector-3.png";
import BrowseFile from "./assets/cv_resume/vector-2.svg";


export const CV_Resume = () => {
  return (
    <>
    <Navbar />
    
    <div className="student-profile-CV">
      <div className="div">
        
        <div className="overlap-group">
          <div className="text-wrapper-2">Upload Resume :</div>
          <div className="text-wrapper-3">Upload CV :</div>
          <button className="frame-wrapper">
            <div className="frame">
              <img className="vector" alt="Vector" src= {cvUpload} />
              <img className="img" alt="Vector" src= {BrowseFile}/>
            </div>
          </button>
          <button className="div-wrapper">
            <div className="frame">
              <img className="vector" alt="Vector" src= {cvUpload} />
              <img className="img" alt="Vector" src= {BrowseFile} />
            </div>
          </button>
          
        </div>
        <div className="selection">
          <button className="basic-info">
            <div className="text-wrapper-8">Basic information</div>
            <div className="rectangle" />
          </button>
          <button className="text-wrapper-9">Education</button>
          <button className="text-wrapper-10">CV/Resume</button>
        </div>
        <div className="button">
          <button className="text-wrapper-11">Save</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CV_Resume;