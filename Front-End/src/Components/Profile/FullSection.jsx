import React, { useState } from "react";
import BasicInfoTab from "./BasicInfoTab";
import CVResumeTab from "./CVResumeTab";
import EducationTab from "./EducationTab";
import LeftSection from "./LeftSection";
import "./style.css";

export const FullSection = (props) => {
  const [ selector, setSelector ] = useState(1);

  return (
    <div className="basic-info-body font-poppins">
      <LeftSection selector={selector} setSelector={setSelector} />
      {selector === 1 && <BasicInfoTab obj={props.obj}/>}
      {selector === 2 && <EducationTab obj={props.obj}/>}
      {selector === 3 && <CVResumeTab obj={props.obj}/>}
    </div>
  );
};

export default FullSection;
