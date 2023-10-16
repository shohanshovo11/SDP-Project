import React from "react";
import "./style.css";
import "./CVstyle.css";
import cvUpload  from "./assets/cv_resume/vector-3.png"
import BrowseFile from "./assets/cv_resume/vector-2.svg";

function mew(props) {
  const { email, institution, name } = props.obj;
  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  return (
    <div>
        <div className="group">
          <div className="text-wrapper-2">Upload Resume :</div>
          <div className="text-wrapper-3">Upload CV :</div>
          <button className="frame-wrapper">
            <div className="frame">
              <img className="vector" alt="Vector" src= {cvUpload} />
              <img className="img" alt="Vector" src= {BrowseFile}/>
            </div>
          </button>
          <button className="div-wrapper">
            <div className="frame">
              <img className="vector" alt="Vector" src= {cvUpload} />
              <img className="img" alt="Vector" src= {BrowseFile} />
            </div>
          </button>
        </div>
    </div>
  );
}

export default mew;
