import React from "react";
import { Link } from "react-router-dom";
export const NavNolog = () => {
  return (
    <>
      <div className="navbar flex justify-between bg-white text-neutral-900">
        <div className="">
          <Link to="/">
            <a className="btn btn-ghost normal-case text-xl font-poppins text-bt font-extrabold pl-8">
              Study WorkNet
            </a>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex text-base font-bold font-poppins">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>About</a>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Job Category</summary>
                <ul className="p-2 bg-white z-40">
                  <li>
                    <Link
                      to="/posted-jobs"
                      onClick={() => {
                        localStorage.setItem("category", "tuition");
                      }}
                    >
                      Tuition
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/posted-jobs"
                      onClick={() => {
                        localStorage.setItem("category", "intern");
                      }}
                    >
                      Internship
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/posted-jobs"
                      onClick={() => {
                        localStorage.setItem("category", "partTime");
                      }}
                    >
                      Part-Time
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/posted-jobs"
                      onClick={() => {
                        localStorage.setItem("category", "freelance");
                      }}
                    >
                      Freelancing
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            {localStorage.getItem("loginType") === "employer" ? (
              <li>
                <Link to="/tutorjob">Post Job</Link>
              </li>
            ) : (
              <li>
                <Link to="">Contact Us</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-center hidden lg:flex text-base font-bold font-poppins">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/signup-option">Sign up</Link>
            </li>
            <li>
              <Link to="/login-option">Login</Link>
            </li>
            <li>
              <a href="#">Help/Support</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
