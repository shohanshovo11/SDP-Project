import React, { useState } from "react";
import Aside from "./Aside";
import Pendingjob from "../PostJob/Pendingjob";
import EmployerProfile from "./EmployerProfile";
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
      <div className="flex w-screen h-screen bg-white">
        <Aside func={handleShowComponent} />
        {activeComponent === "showProfile" && <EmployerProfile />}
        {/* {activeComponent === "approveapplicant" && <Element3 />} */}
        {/* {activeComponent === "showElement4" && <Element4 />} */}
      </div>
    </>
  );
}

export default EmployerDashboard;
