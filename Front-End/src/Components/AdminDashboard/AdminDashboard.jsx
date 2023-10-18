import React, { useState } from "react";
import Aside from "./Aside";
import Profile from "./Profile";
import Element2 from "./Element2";
import Element3 from "./Element3";
import Element4 from "./Element4";

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
        {activeComponent === "showElement2" && <Element2 />}
        {activeComponent === "showElement3" && <Element3 />}
        {activeComponent === "showElement4" && <Element4 />}
      </div>
    </>
  );
}

export default AdminDashboard;
