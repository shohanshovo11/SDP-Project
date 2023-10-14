import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  // const history = useHistory();
  const [profileImg, setProfileImg] = useState(null);
  const email = window.localStorage.getItem("email");
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profileImage?email=${email}`);
        const { profileImg } = response.data;
        setProfileImg(profileImg);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };
    fetchProfileImage();
  }, [email]);

  const removeToken = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('email');
    localStorage.clear();
    // window.location.reload();
    // history.push('/');
  }
  return (
    <>
      <div className="navbar flex justify-between bg-white text-neutral-900">
        <div className="">
          <a className="btn btn-ghost normal-case text-xl">Study WorkNet</a>
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
        <div className="flex-none gap-2 text-base font-poppins bg-white">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
              {profileImg && <img src={profileImg} alt="Profile" />}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link to="/" onClick={removeToken}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
