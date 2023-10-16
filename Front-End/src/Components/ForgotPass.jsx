import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import verify from "../assets/forgotPass/fp-1.svg"; // Import your verification image here
import Footer from "./Footer";
import { NavNolog } from "./navbar/NavNolog";
import axios from 'axios'


export const ForgotPassword = () => {

  const [email, setEmail] = useState()
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/forgot-password', {email})
    .then(res => {
      console.log("Login : " + res.data);
      
      if(res.data.Status == "Success") {
        navigate('/login')
      }
    }).catch(err => console.log(err))
  }


  return (
    <>
      <NavNolog />
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
            onChange={(change) => setEmail(change.target.value)}
            className="input bg-white w-96 block text-black border-2 border-bt mb-6"
          />
          {/* <Link to="/otp"> */}
            <button type="submit" className="verify-btn text-white btn">
              Send Code
            </button>
          {/*</Link>*/}
        </form>
      </div>
      <Footer />
    </>
  );
};
