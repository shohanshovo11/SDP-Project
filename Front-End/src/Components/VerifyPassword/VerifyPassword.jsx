import React from "react";
import { Link } from "react-router-dom";
import swnLogo from "../Images/Study_WorkNet_Logo.png";
import verify from "../Images/verify.png";
import "./VerifyPassword.css";

export const VerifyPassword = () => {
  return (
    <div className="Container">
      <form>
        <img className="swnlogo_" src={swnLogo} alt="Study_WorkNet_Logo" />
        <img className="verify-image" src={verify} alt="A girl" />
        <h2 className="verify-text">Verification Code</h2>
        <p className="description">
          Enter the verification code we just sent you <br />
          On your email address .
        </p>
        <div className="box-wrapper">
          <input type="number" min={0} max={9} className="box1" required />
          <input type="number" min={0} max={9} className="box2" required />
          <input type="number" min={0} max={9} className="box3" required />
          <input type="number" min={0} max={9} className="box4" required />
        </div>
        <Link to="/reset"><button type="submit" className="verify-btn">
          Verify
        </button>
        </Link>
        <div className="again">
          <span className="didnt">Didn't recieve a code?&nbsp;</span>
          <span className="resend">Resend</span>
        </div>
      </form>
    </div>
  );
};

export default VerifyPassword;
