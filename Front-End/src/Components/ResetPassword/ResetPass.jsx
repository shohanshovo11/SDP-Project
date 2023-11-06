import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import reset from "../Images/reset.png";
import { NavNolog } from "../navbar/NavNolog";
import {Axios} from "../api/api";

// Import SVG eye icons for showing and hiding passwords
import hidePasswordIcon from "/eye-off.svg";
import showPasswordIcon from "/eye.svg";

export const ResetPass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { search, state } = useLocation();
  const query = new URLSearchParams(search);
  const email = query.get("data");
  const navigate = useNavigate();
  // console.log(email);

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      Axios
        .post(`/reset-password/${email}`, {
          password: newPassword,
        })
        .then((response) => {
          if (response.data.Status === "Success") {
            console.log("Password reset successfully.");
            // toast.success("Password reset successfully.");
            navigate("/login");
          } else {
            console.log("Password reset failed:", response.data.Status);
          }
        })
        .catch((error) => {
          console.error("API request failed:", error);
        });
    } else {
      console.log("Passwords do not match");
    }
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
        <form className="relative" onSubmit={handleSubmit}>
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
          <button
            type="submit"
            onClick={handleSubmit}
            className="verify-btn text-white btn"
          >
            Save
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ResetPass;
