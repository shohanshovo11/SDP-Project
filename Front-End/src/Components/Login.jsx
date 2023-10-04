import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      toast("Please fill in all fields");
      return;
    }
    // console.log("Form Data:", formData);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast("Login Success");
        navigate("/profile");
      } else {
        const errorData = await response.json();
        toast("Authentication Error");
      }
    } catch (error) {
      toast("Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login  bg-slate-700 h-screen flex justify-center items-center font-cairo text-white my-img bg-no-repeat bg-cover bg-gradient-to-r from-bt to-bt">
        <div className="absolute w-[284px] top-[34px] left-[41px] [text-shadow:3px_4px_3px_#f5f5f526] [font-family:'Red_Rose-Bold',Helvetica] font-bold text-neutral-50 text-[35px] tracking-[0] leading-[normal]">Study WorkNet</div>
        <div className="bg-[#ffffff] bg-opacity-10 p-40 rounded-xl ">
          <div className="w-96">
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base text-white">Username</span>
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base text-white">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? "👁️" : "👁️"}
                  </button>
                </div>
              </div>
              <div className="flex justify-between gap-4 mt-8">
                <button type="submit" className="btn btn-primary grow">
                  Login
                </button>
                <Link to="/sign-up" className="link no-underline btn grow">
                  Sign Up
                </Link>
              </div>
              <div className="text-center mt-4">
                <Link to="/forgot-password" className="link no-underline btn grow">
                  Forgot Password
                </Link>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
