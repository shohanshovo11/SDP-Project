import React from "react";
import "./style.css";

function CVResumeTab(props) {
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
        <div className="overlap-group flex justify-center pt-4">
          <div className="inline-block pr-8 align-top">
            <label className="label">
              <span className="label-text text-black text-xl inline-block">
                Upload CV/Resume:
              </span>
            </label>
            <input
              type="file"
              className="p-1 w-96 font-poppins font-light border rounded-md bg-[#455a64] inline-block"
              name="Change Image"
              accept=""
              onChange={convertToBase64}
            ></input>
          </div>
        </div>
      </div>
      <button className="text-wrapper-11">Save</button>
    </div>
  );
}

export default CVResumeTab;
