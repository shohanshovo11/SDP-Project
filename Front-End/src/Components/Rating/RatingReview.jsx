import React, { useEffect, useState } from "react";
import "./RatingReview.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Axios } from "../api/api";

function RatingReview({ email }) {
  const [ratedUser, setratedUser] = useState("");
  const [rating, setrating] = useState(0);
  const [star, setStar] = useState(0);
  const [review, setreview] = useState("");
  async function getratedUser() {
    const response = await Axios.get(`/studentshow/${email}`);
    const data = response.data;
    setratedUser(data);
  }
  useEffect(() => {
    getratedUser();
  });
  async function giveRating(e) {
    e.preventDefault();
    const reqbody = {
      rating: rating,
      review: review,
    };
    const response = await Axios.post(
      `/giverate/${email}`,
      reqbody
    );
    const data = response.data;
    if (!data.acknowledged) {
      toast.error("Data couldn't be inserted");
      return;
    }
    toast.success("Thanks For Rating");
  }
  return (
    <div className="ama">
      <div className="jama">
        <img src={ratedUser.profileImgUrl} className="Pict" />
        <div className="kathala">{ratedUser.name}</div>
        <div className="peyaraa">{ratedUser.email}</div>
      </div>

      <form className="patal" onSubmit={giveRating}>
        <div className="akash">Give A Rating</div>
        <div className="mati">
          {[...Array(5)].map((starr, index) => (
            <FaStar
              style={{ cursor: "pointer" }}
              color={index + 1 <= (star || rating) ? "#f6c90e" : "ffffff"}
              onClick={() => {
                setrating(index + 1);
              }}
              onMouseEnter={() => {
                setStar(index + 1);
              }}
              onMouseLeave={() => {
                setStar(0);
              }}
              key={index}
            />
          ))}
        </div>

        <div className="lebu">
          <div className="korola">Give A Review</div>
          <textarea
            className="jambura"
            onChange={(e) => {
              setreview(e.target.value);
            }}
          />
        </div>
        <div className="sand">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default RatingReview;
