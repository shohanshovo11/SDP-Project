import React, { useState } from "react";
import "./ApplicantList.css";
import profile from "../Images/profile.png";
import { ApplicantProfile } from "../EmployerDashboard/ApplicantProfile";

export const ApplicantListCard = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleViewProfile = () => {
    openModal();
  };
  return (
    <div className="w-56 h-64 bg-[#8dffd041] flex flex-col justify-between items-center rounded-md shadow-lg shadow-slate-400">
      <img
        className="rounded-full w-16 pt-4"
        src={profile}
        alt="Profile image"
      />
      <h5 className="">{props.name}</h5>
      <span className="">{props.description}</span>
      <div className="flex gap-2 mb-2 mt-2">
        <span className="bg-slate-500 text-white rounded-3xl px-2">
          {props.tags[0]}
        </span>
        <span className="bg-slate-500 text-white rounded-3xl px-2">
          {props.tags[1]}
        </span>
        <span className="bg-slate-500 text-white rounded-3xl px-2">
          {props.tags[2]}
        </span>
      </div>
      <div className="mb-4 flex gap-7">
        <button
          className="bg-bt text-white rounded-3xl px-2 py-1"
          onClick={handleViewProfile}
        >
          View Profile
        </button>
        <button className="bg-bt text-white rounded-3xl px-2 py-1">
          Accept
        </button>
      </div>
      <ApplicantProfile closeModal={closeModal} isModalOpen={isModalOpen} />
    </div>
  );
};

export default ApplicantListCard;
