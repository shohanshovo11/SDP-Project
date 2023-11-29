import React, { useState } from "react";
import Aside from "./Aside";
import Profile from "../AdminDashboard/Profile";
import Pendingjob from "../PostJob/Pendingjob";
import ViewApprove from "../Rating/ViewApprove";
// import Element2 from "./Element2";
// import Element3 from "./Element3";
// import Element4 from "./Element4";

function EmployerDashboard() {
  const [activeComponent, setActiveComponent] = useState("showProfile");
  const handleShowComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <div className="flex w-screen h-screen">
        <Aside func={handleShowComponent} />
        {activeComponent === "showProfile" && <Profile />}
        {activeComponent === "viewapprove" && <ViewApprove />}
        {/* {activeComponent === "approveapplicant" && <Element3 />} */}
        {/* {activeComponent === "showElement4" && <Element4 />} */}
      </div>
    </>
  );
}

export default EmployerDashboard;
