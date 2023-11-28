import React, { useEffect, useState } from "react";
import { Navbar } from "../navbar/Navbar";
import Footer from "../Footer";
import { CGcard } from "./CGcard";
import Profile from "../Images/profile.png";
import "./CGrooming.css";

export const CGrooming = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <>
      <Navbar />
      <div className="faka"></div>
      <div className="pack">
        <ul className="CGbar">
          <li className="all">All Courses</li>
          <li className="sub">My Courses</li>
          <li className="sub">Wish List</li>
          <li className="sub">Archive</li>
        </ul>
        <div className="faka"></div>
        <div className="bigline"></div>
        <div className="middle">
          <div className="left">
            <h1 className="ctg">Category</h1>
            <div className="line"></div>
            <select className="drop">
              <option value="1">React Tutorial</option>
              <option value="2">MongoDB Tutorial</option>
              <option value="3">NodeJS Tutorial</option>
              <option value="4">ExpressJS Tutorial</option>
            </select>
            <div className="faka"></div>
            <h1 className="ctg"> Progress </h1>
            <div className="line"></div>
            <form className="status">
              <label>
                <input className="ip" type="checkbox" onChange={handleChange} />
                In Progress
              </label>
              <label>
                <input className="ip" type="checkbox" onChange={handleChange} />
                Not Started
              </label>
            </form>
            <div className="faka"></div>
            <h1 className="ctg">Instructor</h1>
            <div className="line"></div>
            <select className="drop">
              <option value="1">Mosh Hamedani</option>
              <option value="2">Net Ninja</option>
              <option value="3">Dave Gray</option>
              <option value="4">PedroTech</option>
            </select>
          </div>
          <div className="right">
            <ul className="sortingbar">
              <li className="all">
                <form>
                  <input
                    type="text"
                    className="search"
                    placeholder="  Search"
                  />
                </form>
              </li>
              <span className="sub">Sort By</span>
              <li className="sub">
                <select className="drop2">
                  <option value="1">Newest</option>
                  <option value="2">Price: Lowest to Highest</option>
                  <option value="3">Price: Highest to Lowest</option>
                </select>
              </li>
            </ul>
            <div className="faka"></div>
            <div className="bigline"></div>

            <div className="wholecard">
              <CGcard
                profileImgUrl={Profile}
                name="Mosh Hamedani"
                vidcount="35 videos"
                tag={["MERN", "React", "Web dev"]}
              />
              <CGcard
                profileImgUrl={Profile}
                name="Mosh Hamedani"
                vidcount="35 videos"
                tag={["MERN", "React", "Web dev"]}
              />
              <CGcard
                profileImgUrl={Profile}
                name="Mosh Hamedani"
                vidcount="35 videos"
                tag={["MERN", "React", "Web dev"]}
              />
              <CGcard
                profileImgUrl={Profile}
                name="Mosh Hamedani"
                vidcount="35 videos"
                tag={["MERN", "React", "Web dev"]}
              />
              <CGcard
                profileImgUrl={Profile}
                name="Mosh Hamedani"
                vidcount="35 videos"
                tag={["MERN", "React", "Web dev"]}
              />
              <CGcard
                profileImgUrl={Profile}
                name="Mosh Hamedani"
                vidcount="35 videos"
                tag={["MERN", "React", "Web dev"]}
              />
              <CGcard
                profileImgUrl={Profile}
                name="Mosh Hamedani"
                vidcount="35 videos"
                tag={["MERN", "React", "Web dev"]}
              />
              <CGcard
                profileImgUrl={Profile}
                name="Mosh Hamedani"
                vidcount="35 videos"
                tag={["MERN", "React", "Web dev"]}
              />
              <CGcard
                profileImgUrl={Profile}
                name="Mosh Hamedani"
                vidcount="35 videos"
                tag={["MERN", "React", "Web dev"]}
              />
              <CGcard
                profileImgUrl={Profile}
                name="Mosh Hamedani"
                vidcount="35 videos"
                tag={["MERN", "React", "Web dev"]}
              />
              <CGcard
                profileImgUrl={Profile}
                name="Mosh Hamedani"
                vidcount="35 videos"
                tag={["MERN", "React", "Web dev"]}
              />
              <CGcard
                profileImgUrl={Profile}
                name="Mosh Hamedani"
                vidcount="35 videos"
                tag={["MERN", "React", "Web dev"]}
              />
              <CGcard
                profileImgUrl={Profile}
                name="Mosh Hamedani"
                vidcount="35 videos"
                tag={["MERN", "React", "Web dev"]}
              />
            </div>
          </div>
        </div>
        <div className="faka"></div>
      </div>
      <Footer />
    </>
  );
};
export default CGrooming;
