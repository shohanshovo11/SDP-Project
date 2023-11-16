import React, { useState } from "react";
import Aside from "./Aside";
import Pendingjob from "../PostJob/Pendingjob";
import EmployerProfile from "./EmployerProfile";
import { Link, useNavigate } from "react-router-dom";
// import Element2 from "./Element2";
// import Element3 from "./Element3";
// import Element4 from "./Element4";

function EmployerDashboard() {
  const [activeComponent, setActiveComponent] = useState("");
  const handleShowComponent = (componentName) => {
    setActiveComponent(componentName);
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-screen h-screen bg-white">
        <Aside func={handleShowComponent} />
        {activeComponent === "Home" && navigate("/")}
        {/* {activeComponent === "approveapplicant" && <Element3 />} */}
        {/* {activeComponent === "showElement4" && <Element4 />} */}
      </div>
    </>
  );
}

export default EmployerDashboard;
