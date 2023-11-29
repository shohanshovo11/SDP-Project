import React, { useEffect, useState } from "react";
import "./CGrooming.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export const CGcard = ({ profile, name, vidcount, description, tags, cid }) => {
  const [link, setLink] = useState("");
  // console.log(cid, "ss");

  async function getLink() {
    const response = await axios.get(`http://localhost:5000/link/${cid}`);
    console.log(response.data);
    let data = response.data;
    setLink(data.vidLink);
  }

  useEffect(() => {
    getLink();
  }, []);

  return (
    <div className="card">
      <img className="profile-image" src={profile} alt="Profile image" />
      <h5 className="Name">Creator: {name}</h5>
      <span className="Name">{vidcount} videos</span>
      <span className="Name">Title: {description}</span>
      <div className="vidtag">
        {tags.map((tag, index) => (
          <span key={index} className="tags">
            {tag}
          </span>
        ))}
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button className="viewButton">View Courses</button>
      </a>
    </div>
  );
};

export default CGcard;
