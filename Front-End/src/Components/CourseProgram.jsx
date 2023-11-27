import React from "react";
import { Link } from "react-router-dom";

function CourseProgram() {
  return (
    <div className="bg-white font-poppins text-black flex">
      <div
        style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="landing/Course.png"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
          }}
          alt=""
        />
      </div>
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "14px",
        }}
        className="px-8"
      >
        <h1 className="text-[#263238] text-4xl font-bold mb-8 text-right">
          Join Our Career Course Program
        </h1>
        <p className="text-right mb-8">
        Join our trending courses and become an expert of your chosen professions. 
        Make your learning experience as complete, dynamic, and interesting as possible. 
        Here you can find a wide range of categories and groups to help you enhance your skills and knowledge so that you can stand out from the crowd. 
        You can achieve your goals with the help of our diverse educators. 
        Attend our exciting live session, which includes recorded supplemental collaborative tools, on a regular basis. 
        Don't put it off any longer, grab it right now and start learning from the best learning portal.
        </p>
        <Link className="btn btn-square h-16 w-72 bg-bt text-white" to="/courses" >
          Enroll in Career Courses
        </Link>
      </div>
    </div>
  );
}

export default CourseProgram;
