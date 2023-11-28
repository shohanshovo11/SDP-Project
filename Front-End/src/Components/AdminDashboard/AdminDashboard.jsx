import React, { useState } from "react";
import Aside from "./Aside";
import Profile from "./Profile";
import Element3 from "./Element3";
import Element4 from "./Element4";
import Pendingjob from "../PostJob/Pendingjob";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState("showpendingjob");
  const navigate = useNavigate();
  // const handleShowComponent = (componentName) => {
  //   setActiveComponent(componentName);
  // };

  const handleShowComponent = (componentName) => {
    if (componentName === "showElement3") {
      // Display a confirmation dialog
      const userConfirmed = window.confirm("Are you sure you want to log out?");
      if (userConfirmed) {
        // Clear localStorage if the user confirmed
        localStorage.clear();
        navigate("/");
      }
    } else {
      setActiveComponent(componentName);
    }
  };

  return (
    <>
      <div className="flex w-screen h-screen">
        <Aside func={handleShowComponent} />
        {/* <Profile /> */}
        {/* <Element3 /> */}
        {activeComponent === "showpendingjob" && <Pendingjob />}
        {activeComponent === "showProfile" && <>{navigate("/")}</>}
        {activeComponent === "showElement3" && <></>}
        {activeComponent === "showElement4" && <Element4 />}
      </div>
    </>
  );
}

export default AdminDashboard;
