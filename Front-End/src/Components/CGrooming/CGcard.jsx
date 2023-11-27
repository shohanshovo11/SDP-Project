import React from "react";
import "./CGrooming.css";

export const CGcard = (channel) => {
  return (
    <div>
      <div className="card">
        <img
          className="profile-image"
          src={channel.profileImgUrl}
          alt="Profile image"
        />
        <h5 className="Name">{channel.name}</h5>
        <span className="Name">{channel.vidcount}</span>
        <div className="vidtag">
          <span className="tags">{channel.tag[0]}</span>
          <span className="tags">{channel.tag[1]}</span>
          <span className="tags">{channel.tag[2]}</span>
        </div>
        <button className="viewButton">View Courses</button>
      </div>
    </div>
  );
};

export default CGcard;
