import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import verify from "../Images/verify.png";
import { NavNolog } from "../navbar/NavNolog";
import "./VerifyPassword.css";
import { Axios } from "../api/api";
import { ToastContainer, toast } from "react-toastify";

export const VerifyPassword = () => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();
  const { search, state } = useLocation();
  const query = new URLSearchParams(search);
  const email = query.get("data");
  // console.log(email);

  const focusNextInput = (index) => {
    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const focusPreviousInput = (index) => {
    if (index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  const getOTP = () => {
    const otp = inputRefs.map((inputRef) => inputRef.current.value).join("");
    return otp;
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      inputRefs[index].current.value = value;
      //console.log(inputRefs[index].current.value)
      focusNextInput(index);
    } else if (value === "") {
      // Check for Backspace key (keyCode 8)
      if (e.keyCode === 8) {
        focusPreviousInput(index);
      }
    } else {
      inputRefs[index].current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = getOTP();
    console.log(otp);

    try {
      const response = await Axios.post("/verify-otp", {
        email,
        otp,
      });

      if (response.data.Status === "Success") {
        // toast.success("Verification Successful.");
        navigate(`/reset-password?data=${email}`);
        // navigate("/reset-password");
      } else {
        toast.error(response.data.Status);
      }
    } catch (err) {
      toast.error("Verification Failed.");
      console.log(err);
    }
  };

  return (
    <>
      <NavNolog />
      <ToastContainer />
      <div className="font-poppins flex justify-center items-center bg-white gap-12 py-24">
        <img
          className="verify-image bg-bt w-96 rounded-md"
          src={verify}
          alt="A girl"
        />
        <div className="vertical-line h-80"></div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2 className="text-3xl text-bt font-semibold pb-12">
            Verification Code
          </h2>
          <p className="text-black pb-6">
            Enter the verification code we just sent you <br />
            On your email address.
          </p>
          <div className="box-wrapper flex gap-6 pb-6">
            <input
              type="text"
              maxLength="1"
              className="box1"
              ref={inputRefs[0]}
              onKeyDown={(e) => handleInputChange(e, 0)}
              required
            />
            <input
              type="text"
              maxLength="1"
              className="box2"
              ref={inputRefs[1]}
              onKeyDown={(e) => handleInputChange(e, 1)}
              required
            />
            <input
              type="text"
              maxLength="1"
              className="box3"
              ref={inputRefs[2]}
              onKeyDown={(e) => handleInputChange(e, 2)}
              required
            />
            <input
              type="text"
              maxLength="1"
              className="box4"
              ref={inputRefs[3]}
              onKeyDown={(e) => handleInputChange(e, 3)}
              required
            />
          </div>
          {/* <Link to="/reset-password"> */}
          <button type="submit" className="verify-btn text-white btn">
            Verify
          </button>
          {/* </Link> */}
          <div className="pt-6">
            <span className="didnt">Didn't receive a code?&nbsp;</span>
            <span className="resend">Resend</span>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default VerifyPassword;
