import React from "react";
import { Link } from "react-router-dom";
import swnLogo from "../Images/Study_WorkNet_Logo.png";
import reset from "../Images/reset.png";
import "./ResetPass.css";

export const ResetPass = () => {
  return (
    <div className="Container">
      <form>
        <img className="swnlogo_" src={swnLogo} alt="Study_WorkNet_Logo" />
        <div className="flex gap-10">
          <img className="reset-image" src={reset} alt="A girl" />
          <div>
            <h2 className="reset-text">Reset Password</h2>

            <p className="description">
              Your new password must be different from the <br /> password you
              used previously
            </p>

            <div className="box-wrapper">
              <input
                className="box-1"
                type="Password"
                placeholder="  New Password"
              />
              <input
                className="box-2"
                type="Password"
                placeholder="  Confirm Password"
              />
            </div>
          </div>
        </div>
        <Link to="/login">
          <button type="submit" className="save-button">
            Save
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ResetPass;
