import React from "react";
import Footer from "./Footer";
import { NavNolog } from "./navbar/NavNolog";
import { Navbar } from "./navbar/Navbar";
import { Link } from "react-router-dom";

function SignUpOption() {
  const handleClick = (string) => {
    localStorage.clear();
    localStorage.setItem("signupType", string);
    console.log(localStorage.getItem("signupType"));
    console.log(localStorage.getItem("loginType"));
  };

  return (
    <>
      {localStorage.getItem("email") ? <Navbar /> : <NavNolog />}
      <div className="w-full h-auto bg-white flex justify-center gap-20 text-black font-poppins pt-20">
        <div>
          <img src="/signup.png" className="w-96" />
        </div>
        <div className="vertical-line h-96"></div>
        <div className="flex flex-col justify-center">
          <h1 className="pb-4 text-4xl font-semibold text-bt">
            Create an account
          </h1>
          <h1 className="text-xl pb-8">Select the type of your account</h1>
          <div className="flex gap-20 text-center">
            <div className="flex flex-col gap-4 w-40 h-40">
              <Link
                to="/sign-up"
                onClick={() => {
                  handleClick("student");
                }}
              >
                <img
                  src="/getajob.svg"
                  className="cursor-pointer w-full h-auto"
                />
              </Link>
              <p className="text-center">Student</p>
            </div>
            <div className="flex flex-col gap-4 w-40 pb-44">
              <Link
                to="/signup-employer"
                onClick={() => {
                  handleClick("employer");
                }}
              >
                <img src="/postajob.svg" className="cursor-pointer " />
              </Link>
              <p className="text-center">Employer</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUpOption;
