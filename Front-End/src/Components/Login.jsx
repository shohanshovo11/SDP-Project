import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import { NavNolog } from "./navbar/NavNolog";

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
      <NavNolog />
      <div className="bg-white pb-28 pt-16">
        <ToastContainer />
        <div className=" bg-white h-screen flex justify-center items-center font-cairo text-black my-img bg-no-repeat bg-cover">
          <div className="border-2 border-bt bg-opacity-90 p-40 rounded-xl relative">
            <h1 className="text-4xl font-extrabold absolute top-12 text-bt left-1/2 transform -translate-x-1/2 ">Login</h1>
            <div className="w-96">
              <form onSubmit={handleSubmit}>
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
                    className="input bg-white w-full text-black border-2 border-bt"
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
                      className="input bg-white w-full text-black border-2 border-bt"
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
