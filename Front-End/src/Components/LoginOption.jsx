import React from "react";
import Footer from "./Footer";
import { NavNolog } from "./navbar/NavNolog";
import { Navbar } from "./navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";

function LoginOption() {
  const navigate = useNavigate();
  const handleClick = (string) => {
    localStorage.clear();
    navigate("/login", { replace: true, state: { loginType: string } });
    // localStorage.setItem("loginType", string);
    // console.log(localStorage.getItem("loginType"));
    // console.log(localStorage.getItem("signupType"));
  };
  const handleClick2 = (string) => {
    localStorage.clear();
    localStorage.setItem("loginType", string);
    console.log(localStorage.getItem("loginType"));
    console.log(localStorage.getItem("signupType"));
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
            Login To Your Account
          </h1>
          <h1 className="text-xl pb-8">Select the type of your account</h1>
          <div className="flex gap-20 text-center">
            <div className="flex flex-col gap-4 w-40 h-40">
              <button
                onClick={() => {
                  handleClick("student");
                }}
              >
                <img
                  src="/getajob.svg"
                  className="cursor-pointer w-full h-auto"
                />
              </button>
              <p className="text-center">Student</p>
            </div>
            <div className="flex flex-col gap-4 w-40 pb-44">
              <button
                onClick={() => {
                  handleClick("employer");
                }}
              >
                <img src="/postajob.svg" className="cursor-pointer " />
              </button>
              <p className="text-center">Employer</p>
            </div>
            <div className="flex flex-col gap-5 w-40 h-40 pb-60">
              <Link
                to="/adminlogin"
                onClick={() => {
                  handleClick2("admin");
                }}
              >
                <img
                  src="/admin.png"
                  className="cursor-pointer w-full h-auto"
                />
              </Link>
              <p className="text-center">Admin</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginOption;
