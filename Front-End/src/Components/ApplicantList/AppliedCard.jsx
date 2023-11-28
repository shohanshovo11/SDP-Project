import React from "react";
import "./AppliedList.css";
import axios from "axios";
import { toast } from "react-toastify";

export const AppliedCard = ({ applicant, sid, jId }) => {
  async function handleClick() {
    const response = await axios.put(
      `http://localhost:5000/accept/${jId}/${sid}`
    );
    const data = response.data;
    if (!data.acknowledged) {
      toast.error("Data couldn't be updated");
      return;
    }
    toast.success("Data successfully updated");
  }
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
          <button className="viewButton" onClick={handleClick}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppliedCard;
