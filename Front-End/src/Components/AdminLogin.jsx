import { Axios } from "../Components/api/api";
import React, { useState } from "react";
import { Dna } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import { NavNolog } from "./navbar/NavNolog";
import eyeOff from "/eye-off.svg";
import eye from "/eye.svg";
import verify from "/login.svg"; // Import your verification image here
import axios from "axios";

export const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      let am = localStorage.getItem("loginType");
      let response;
      if (am === "student") {
        response = await Axios.post("/login", formData);
      } else if (am === "admin") {
        response = await Axios.post("/adminlogin", formData);
      }
      if (response.status === 200) {
        const data = response.data;
        if (data.status === "ok") {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("email", formData.email);
          window.localStorage.setItem("profileImgUrl", data.profileImgUrl);
          // console.log("Token stored ", data.token);
          if (am === "student") {
            window.location.href = "/profile";
          } else if (am === "admin") {
            window.location.href = "/admin-dashboard";
          }
        } else {
          toast.error("Invalid Email or Password");
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <NavNolog />
      <ToastContainer />
      <div className="font-poppins flex justify-center items-center bg-white gap-6 py-24">
        {loading ? (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-100 bg-white z-50">
            <Dna
              visible={true}
              height={150}
              width={150}
              ariaLabel="dna-loading"
            />
          </div>
        ) : (
          <>
            <img
              className="verify-image bg-bt w-[35rem] p-4 rounded-md"
              src={verify}
              alt="Login"
            />
            <div className="vertical-line h-80"></div>
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl text-bt font-semibold pb-6">Login</h2>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Email
                  </span>
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  placeholder="Type here"
                  className="input bg-white w-96 text-black border-2 border-bt mb-6"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    placeholder="Type here"
                    className="input bg-white w-96 text-black border-2 border-bt"
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <img src={eye} className="w-6" />
                    ) : (
                      <img src={eyeOff} className="w-6" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-between gap-4 mt-8">
                <button type="submit" className="btn bg-bt text-white grow">
                  Login
                </button>
                <Link
                  to="/signup-option"
                  className="link no-underline btn grow"
                >
                  Sign Up
                </Link>
              </div>
              <div className="text-center mt-4">
                <Link
                  to="/forgot-password"
                  className="link no-underline btn grow"
                >
                  Forgot Password
                </Link>{" "}
              </div>
            </form>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};
