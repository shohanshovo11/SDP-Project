import React, { useState } from "react";
import Category from "../PostJob/Category";
import PortalPopUp from "../PortalPopUp";
import pic from "./Picture.jpg"
import { motion,AnimatePresence } from "framer-motion";

function Aside(props) {
   const [postjob, setpostJob] = useState(false);
   function togglePostJob() {
      setpostJob(!postjob);
  }
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    if(buttonName==="postajob")
       {togglePostJob()
       }
    setSelectedButton(buttonName);
    props.func(buttonName);
  };

  return (
    <>
      <div className="w-80 sticky h-screen bg-slate-800 text-white flex flex-col justify-center items-center font-poppins">
        <div className="text-center text-4xl font-bold py-2">Study WorkNet</div>
        <h1 className="text-center text-2xl pb-6">Employer Dashboard</h1>
        <div class="relative w-24 h-24">
          <img
            class="rounded-full border border-gray-100 shadow-sm w-24 h-24 object-cover"
            src={pic}
            alt="user image"
          />
          <div class="absolute top-0 right-0 h-6 w-6 my-1 border-4 border-white rounded-full bg-green-400 z-2"></div>
        </div>
        <h1 className="text-center text-xl pb-6 pt-4">Hello, User</h1>
        <hr className="bg-white"></hr>
        <div className="flex flex-col w-full">
          <button
            className={`py-2 hover:bg-bt hover:text-white text-xl font-thin w-full text-white ${
              selectedButton === "showProfile" ? "bg-bt" : "text-slate-500"
            }`}
            onClick={() => handleButtonClick("showProfile")}
          >
            Profile
          </button>
          <button
            className={`py-2 hover:bg-bt hover:text-white text-xl font-thin w-full text-white ${
              selectedButton === "postajob" ? "bg-bt" : "text-slate-500"
            }`}
            onClick={() => handleButtonClick("postajob")}
          >
            Post A Job
          </button>
          <button
            className={`py-2 hover:bg-bt hover:text-white text-xl font-thin w-full text-white ${
              selectedButton === "approveapplicant" ? "bg-bt" : "text-slate-500"
            }`}
            onClick={() => handleButtonClick("approveapplicant")}
          >
            Approve Applicant
          </button>
          <button
            className={`py-2 hover:bg-bt hover:text-white text-xl font-thin w-full text-white ${
              selectedButton === "viewapprove" ? "bg-bt" : "text-slate-500"
            }`}
            onClick={() => handleButtonClick("viewapprove")}
          >
            Rate Employee
          </button>
          {/* <button
            className={`py-2 hover:bg-bt hover:text-white text-xl font-thin w-full text-white ${
              selectedButton === "showElement4" ? "bg-bt" : "text-slate-500"
            }`}
            onClick={() => handleButtonClick("showElement4")}
          >
            button
          </button> */}
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {postjob && (
        <PortalPopUp
          overlayColor="rgba(0,0,0, 0.5)"
          placement="Centered"
          onOutsideClick={togglePostJob}
        >
          <Category />
        </PortalPopUp>
      )}
      </AnimatePresence>
    </>
  );
}

export default Aside;
