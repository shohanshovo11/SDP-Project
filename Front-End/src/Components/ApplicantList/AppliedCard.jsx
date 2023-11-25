import React from "react";
import "./ApplicantList.css";

export const AppliedCard = ({ applicant }) => {
  return (
    <div>
      <div className="card">
        <img
          className="profile-image"
          src={applicant.profileImgUrl}
          alt="Profile image"
        />
        <h5 className="name">{applicant.name}</h5>
        <div className="buttons">
          <button className="viewButton">Details</button>
          <button className="acceptButton">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default AppliedCard;
