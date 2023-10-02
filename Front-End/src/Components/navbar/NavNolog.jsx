import React from "react";
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
              <a className="">Home</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Job Category</summary>
                <ul className="p-2 bg-white">
                  <li>
                    <a>Tuition</a>
                  </li>
                  <li >
                    <a>Internship</a>
                  </li>
                  <li >
                    <a>J</a>
                  </li>
                  <li >
                    <a>I</a>
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
              <a href="#">Sign up</a>
            </li>
            <li>
              <a href="#">Login</a>
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
