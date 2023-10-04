import React, { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { default as eyeIcon, default as eyeSlashIcon } from "../Images/eye-off.png";

import { Link } from "react-router-dom";
import Study_work_net_logo from "../Images/Study_WorkNet_Logo.png";
import signin_logo from "../Images/sign_in.png";
import "./Signup.css"; // Make sure to import your CSS file

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

    // Create state variables for password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    // Toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleInstitutionChange = (event) => {
    setInstitution(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      toast("Password Doesn't Match");
      return;
    } else {
      setPasswordsMatch(true);
    }

    // If passwords match, continue with form submission logic
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: {
          fname: firstName,
          lname: lastName,
        },
        institution,
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          // If status is 400, email already exists, show an toast
          toast("User already exists");
          throw new Error("User already exists");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "userRegister");
        toast("Account Created");
        console.log("Form submitted");
      })
      .catch((e) => {
        console.error(e.message);
      });
    };

  return (
    <div className="container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <img className="swnlogo_" src={Study_work_net_logo} alt="" />

        <img className="signin_" src={signin_logo} alt="Image of a boy using phone" />

        <div className="create">Create Your Account</div>

        <div className="up">
          <fieldset className="firstName">
            <legend className="ins">First Name</legend>
            <input
              type="text"
              className="inputBox text-slate-50 pl-3"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
          </fieldset>
          <fieldset className="lastName">
            <legend className="ins">Last Name</legend>
            <input
              type="text"
              className="inputBox text-slate-50 pl-3"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </fieldset>
          <fieldset className="institution">
            <legend className="ins">Institution</legend>
            <input
              type="text"
              className="l_inputBox text-slate-50 pl-3"
              value={institution}
              onChange={handleInstitutionChange}
              required
            />
          </fieldset>
          <fieldset className="e-mail">
            <legend className="ins">Email</legend>
            <input
              type="email"
              className="l_inputBox text-slate-50 pl-3"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </fieldset>
        <fieldset className="pass relative">
          <legend className="ins">Password</legend>
          <input
            type={showPassword ? "text" : "password"} // Use "text" when showPassword is true
            className="l_inputBox text-slate-50 pl-3"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="button"
            className="password-toggle absolute left-[540px]"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <img src={eyeSlashIcon} alt="Hide Password" />
            ) : (
              <img src={eyeIcon} alt="Show Password" />
            )}
          </button>
        </fieldset>
        <fieldset className="cpass">
          <legend className="ins">Confirm Password</legend>
          <input
            type={showConfirmPassword ? "text" : "password"} // Use "text" when showConfirmPassword is true
            className="l_inputBox text-slate-50 pl-3"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <button
            type="button"
            className="password-toggle relative left-[540px] top-[-25px]"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? (
              <img src={eyeSlashIcon} alt="Hide Password" />
            ) : (
              <img src={eyeIcon} alt="Show Password" />
            )}
          </button>
        </fieldset>
          {!passwordsMatch && (
            <p className="password-mismatch">
              Password and confirm password do not match.
            </p>
          )}
          <button className="createButton btn p-0 max-w-[582px] text-white" type="submit">
            Create Account
          </button>
          <p className="alreadyhave">
            <span className="aha">Already have an account? </span>
            <Link to="/login"  className="login no-underline btn btn-sm bg-bt p-0 max-h-1 px-3 border-0">Log in</Link>
          </p>
          
        </div>
      </form>
    </div>
  );
};
