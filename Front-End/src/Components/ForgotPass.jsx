import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import verify from "../assets/forgotPass/fp-1.svg"; // Import your verification image here
import Footer from "./Footer";
import { NavNolog } from "./navbar/NavNolog";
import { Axios } from "../Components/api/api";
import { ToastContainer, toast } from "react-toastify";

export const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/forgot-password", { email }) // Send the email value in the request
      .then((res) => {
        if (res.data.status === "Success") {
          console.log(email); // If you need to use email elsewhere
          // toast.success("OTP sent to the email address");
          navigate(`/otp?data=${email}`);
        } else {
          toast.error("OTP already sent to the email address");
        }
      })
      .catch((err) => {
        if (err.response.data.status == "User does not exist.") {
          toast.error("User does not exist.");
        } else {
          // toast.error("OTP already sent to the email address");
          navigate(`/otp?data=${email}`);
        }
      });
  };

  return (
    <>
      <NavNolog />
      <ToastContainer />
      <div className="font-poppins flex justify-center items-center bg-white gap-12 py-24">
        <img
          className="verify-image bg-bt w-96 rounded-md"
          src={verify}
          alt="Forgot Password"
        />
        <div className="vertical-line h-80"></div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl text-bt font-semibold pb-12">
            Forgot Password
          </h2>
          <p className="text-black pb-6">
            The verification code will be sent to your <br />
            E-mail, please check it.
          </p>
          <input
            type="text"
            name="email"
            placeholder="Type here"
            onChange={(e) => setEmail(e.target.value)}
            className="input bg-white w-96 block text-black border-2 border-bt mb-6"
          />
          {/* <Link to={{ pathname: "/otp", state: { email: email } }}> */}
          <button
            onClick={handleSubmit}
            type="submit"
            className="verify-btn text-white btn"
          >
            Send Code
          </button>
          {/* </Link> */}
        </form>
      </div>
      <Footer />
    </>
  );
};
