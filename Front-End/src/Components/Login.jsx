import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import { NavNolog } from "./navbar/NavNolog";
import eyeOff from "/eye-off.svg";
import eye from "/eye.svg";
import verify from "/login.svg"; // Import your verification image here

export const Login = () => {
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
    // console.log("Form Data:", formData);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      .then((res)  => res.json())
      .then((data) =>{
        console.log(data,"userReg");
        if(data.status == "ok"){
          
          window.localStorage.setItem("token", data.data);
          window.location.href = "/profile";
          toast.success("Login Success");
        }
        else
        {
          toast.error("Invalid Email or Password");
        }
      })
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <NavNolog />
      <ToastContainer />
      <div className="font-poppins flex justify-center items-center bg-white gap-6 py-24">
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
                Username
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
                {showPassword ? 
                <img src={eye} className="w-6" /> : <img src={eyeOff} className="w-6" />}
              </button>
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-8">
            <button type="submit" className="btn bg-bt text-white grow">
              Login
            </button>
            <Link to="/sign-up" className="link no-underline btn grow">
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
      </div>
      <Footer />
    </>
  );
};
