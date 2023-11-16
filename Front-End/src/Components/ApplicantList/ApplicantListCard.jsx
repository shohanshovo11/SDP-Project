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
    <div className="card">
      <img className="profile-image" src={profile} alt="Profile image" />
      <h5 className="name">{props.name}</h5>
      <span className="p-description">{props.description}</span>
      <div className="qualification">
        <span className="tag">{props.tags[0]}</span>
        <span className="tag">{props.tags[1]}</span>
        <span className="tag">{props.tags[2]}</span>
      </div>
      <div className="buttons mb-3">
        <button className="viewButton" onClick={handleViewProfile}>
          View Profile
        </button>
        <button className="acceptButton">Accept</button>
      </div>
      <ApplicantProfile closeModal={closeModal} isModalOpen={isModalOpen} />
    </div>
  );
};

export default ApplicantListCard;
