import { Axios } from "../Components/api/api";
import React, { useState } from "react";
import { Dna } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import { NavNolog } from "./navbar/NavNolog";
import eyeOff from "/eye-off.svg"; // Correct path
import eye from "/eye.svg"; // Correct path
import signup from "/signup.png"; // Correct path

export const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    // If passwords match, continue with form submission logic
    Axios.post("/register", {
      email: formData.email,
      password: formData.password,
    })
      .then((response) => {
        if (response.status === 400) {
          // If status is 400, email already exists, show a toast
          toast.error("User already exists");
          throw new Error("User already exists");
        }
        return response.data;
      })
      .then((data) => {
        console.log(data, "userRegister");
        toast.success("Account Created");
        console.log("Form submitted");
        // navigate("/"); // You can navigate to the profile page here
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.error(error.message);
      });
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
              className="verify-image h-[30rem] p-4 rounded-md"
              src={signup}
              alt="Login"
            />
            <div className="vertical-line h-80"></div>
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl text-bt font-semibold pb-6">Sign Up</h2>
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
                  autoComplete="off"
                  placeholder="Type here"
                  className="input bg-white w-96 text-black border-2 border-bt"
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
                      <img src={eye} className="w-6" alt="Show Password" />
                    ) : (
                      <img src={eyeOff} className="w-6" alt="Hide Password" />
                    )}
                  </button>
                </div>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base text-black font-semibold">
                    Confirm Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder="Type here"
                    className="input bg-white w-96 text-black border-2 border-bt"
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={handleToggleConfirmPassword}
                    className="absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <img src={eye} className="w-6" alt="Show Password" />
                    ) : (
                      <img src={eyeOff} className="w-6" alt="Hide Password" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="btn mb-2 bg-bt text-white grow mt-6 w-full"
              >
                Create Account
              </button>
              <p className="alreadyhave">
                <span className="">Already have an account? </span>
                <Link
                  to="/login-option"
                  className="login no-underline btn btn-sm bg-bt p-0 max-h-1 px-3 border-0"
                >
                  Log in
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
