import React from "react";
import "./ApplicantList.css";
import profile from "../Images/profile.png";

export const ApplicantListCard = (props) => {
  return (
    <div>
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
          <button className="viewButton">View Profile</button>
          <button className="acceptButton">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantListCard;
