import React, { useState } from "react";
import Aside from "./Aside";
import Profile from "./Profile";
import Element3 from "./Element3";
import Element4 from "./Element4";
import Pendingjob from "../PostJob/Pendingjob";

function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState("showProfile");
  const handleShowComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <div className="flex w-screen h-screen">
        <Aside func={handleShowComponent} />
        {activeComponent === "showProfile" && <Profile />}
        {activeComponent === "showpendingjob" && <Pendingjob />}
        {activeComponent === "showElement3" && <Element3 />}
        {activeComponent === "showElement4" && <Element4 />}
      </div>
    </>
  );
}

export default AdminDashboard;
