import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import reset from "../Images/reset.png";
import { NavNolog } from "../navbar/NavNolog";

// Import SVG eye icons for showing and hiding passwords
import hidePasswordIcon from "/eye-off.svg";
import showPasswordIcon from "/eye.svg";

export const ResetPass = () => {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
      <NavNolog />
      <div className="font-poppins flex justify-center items-center bg-white gap-12 py-24">
        <img
          className="verify-image bg-bt w-96 rounded-md"
          src={reset}
          alt="A girl"
        />
        <div className="vertical-line h-80"></div>
        <form className="relative">
          <h2 className="text-3xl text-bt font-semibold pb-12">
            Reset Password
          </h2>
          <p className="text-black pb-6">
            Your new password must be different from the <br /> password you
            used previously.
          </p>
          <div className="box-wrapper flex flex-col">
            <div className="relative mb-6">
              <input
                className="box-1 input bg-white w-96 block text-black border-2 border-bt pr-10"
                type={newPasswordVisible ? "text" : "password"}
                placeholder="New Password"
              />
              <button
                type="button"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 eye-button w-6"
                onClick={toggleNewPasswordVisibility}
              >
                {newPasswordVisible ? (
                  <img src={hidePasswordIcon} alt="Hide Password" />
                ) : (
                  <img src={showPasswordIcon} alt="Show Password" />
                )}
              </button>
            </div>
            <div className="relative mb-6">
              <input
                className="box-2 input bg-white w-96 block text-black border-2 border-bt pr-10"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 eye-button w-6"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? (
                  <img src={hidePasswordIcon} alt="Hide Password" />
                ) : (
                  <img src={showPasswordIcon} alt="Show Password" />
                )}
              </button>
            </div>
          </div>
          <Link to="/login">
            <button type="submit" className="verify-btn text-white btn">
              Save
            </button>
          </Link>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ResetPass;
