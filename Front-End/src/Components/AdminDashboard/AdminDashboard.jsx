import React, { useState } from "react";
import Aside from "./Aside";
import PostRequests from "./PostRequests";
import ApplyRequests from "./ApplyRequests";
import EmployerVerify from "./EmployerVerify";
import Complains from "./Complains";

function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState("postRequest");
  const handleShowComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <div className="flex w-screen h-screen">
        <Aside func={handleShowComponent} />
        {activeComponent === "postRequest" && <PostRequests />}
        {activeComponent === "applyRequest" && <ApplyRequests />}
        {activeComponent === "showElement3" && <EmployerVerify />}
        {activeComponent === "showElement4" && <Complains />}
      </div>
    </>
  );
}

export default AdminDashboard;
