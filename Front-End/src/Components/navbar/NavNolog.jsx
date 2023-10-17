import React from "react";
import { Link } from "react-router-dom";
export const NavNolog = () => {
  return (
    <>
      <div className="navbar flex justify-between bg-white text-neutral-900">
        <div className="">
          <a className="btn btn-ghost normal-case text-xl font-poppins text-bt font-extrabold pl-8">Study WorkNet</a>
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
                <ul className="p-2 bg-white z-50">
                  <li>
                    <Link to="/posted-jobs">Tuition</Link>
                  </li>
                  <li >
                    <a>Internship</a>
                  </li>
                  <li >
                    <a>Part-Time</a>
                  </li>
                  <li >
                    <a>Freelancing</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>
        <div className="navbar-center hidden lg:flex text-base font-bold font-poppins">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/sign-up">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
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
