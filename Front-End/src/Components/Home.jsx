import axios from "axios";
import React, { useEffect, useState } from "react";
import AroundPpl from "./AroundPpl";
import CourseProgram from "./CourseProgram";
import Footer from "./Footer";
import Poster from "./Poster/Poster";
import Card from "./card/Card";
import { NavNolog } from "./navbar/NavNolog";
import { Navbar } from "./navbar/Navbar";
function Home(props) {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("token") || "");
  const [noNav, setNoNav] = useState(!jwtToken);
  useEffect(() => {
    if (jwtToken) {
      console.log(`JWT Token: ${jwtToken}`);
      axios
        .post(
          'http://localhost:5000/userData',
          { token: jwtToken },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('JWT Token not found in localStorage');
    }
  }, [jwtToken]);
  
  return (
    <div className="bg-white font-poppins">
       {noNav ? <NavNolog /> : <Navbar />}
      <Poster />
      <div className="flex flex-col justify-center items-center bg-white font-poppins font-bold text-black">
        <h1 className="py-6 text-3xl">How It Works?</h1>
        <div className="flex gap-12">
          <Card
            obj={{
              text: "Create Account",
              col: "#CEDADF",
              src: "card1/create.svg",
            }}
          />
          <Card
            obj={{
              text: "Complete Profile",
              col: "#CEDADF",
              src: "card1/compelet.svg",
            }}
          />
          <Card
            obj={{
              text: "Search Your Job",
              col: "#CEDADF",
              src: "card1/srcjb.svg",
            }}
          />
          <Card
            obj={{
              text: "Apply For Job",
              col: "#CEDADF",
              src: "card1/job.svg",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-28">
        <h1 className="py-6 text-3xl font-bold text-black">
          Popular Job Category
        </h1>
        <div className="flex justify-center gap-12 pb-12">
          <Card
            obj={{
              text: "UI/UX Design",
              col: "#FFFFFF",
              src: "card1/mid/Vector.svg",
              shadow: true,
              text2: "1,200 Jobs",
            }}
          />
          <Card
            obj={{
              text: "Web Developer",
              col: "#FFFFFF",
              src: "card1/mid/Vector (1).svg",
              shadow: true,
              text2: "1,200 Jobs",
            }}
          />
          <Card
            obj={{
              text: "Salesman",
              col: "#FFFFFF",
              src: "card1/mid/Vector (2).svg",
              shadow: true,
              text2: "1,200 Jobs",
            }}
          />
          <Card
            obj={{
              text: "Tuition",
              col: "#FFFFFF",
              src: "card1/mid/Vector (3).svg",
              shadow: true,
              text2: "1,200 Jobs",
            }}
          />
        </div>
        <div className="flex justify-center gap-12">
          <Card
            obj={{
              text: "Data Entry",
              col: "#FFFFFF",
              src: "card1/mid/Vector (4).svg",
              shadow: true,
              text2: "1,200 Jobs",
            }}
          />
          <Card
            obj={{
              text: "Social Media Manager",
              col: "#FFFFFF",
              src: "card1/mid/Vector (5).svg",
              shadow: true,
              text2: "1,200 Jobs",
            }}
          />
          <Card
            obj={{
              text: "Accountant",
              col: "#FFFFFF",
              src: "card1/mid/Vector (6).svg",
              shadow: true,
              text2: "1,200 Jobs",
            }}
          />
          <Card
            obj={{
              text: "Graphic Designer",
              col: "#FFFFFF",
              src: "card1/mid/Vector (7).svg",
              shadow: true,
              text2: "1,200 Jobs",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-white font-poppins font-bold text-black mt-28 mb-28">
        <h1 className="py-6 text-3xl">Our Present Service</h1>
        <div className="flex gap-12">
        <Card
            obj={{
              text: "Registered Tutors",
              col: "#CEDADF",
              src: "card1/low/ic1.svg",
              shadow: false,
              text2: "1,234",
            }}
          />
          <Card
            obj={{
              text: "Part-time Jobs",
              col: "#CEDADF",
              src: "card1/low/ic2.svg",
              shadow: false,
              text2: "1,200 Jobs",
            }}
          />
          <Card
            obj={{
              text: "Internships",
              col: "#CEDADF",
              src: "card1/low/ic3.svg",
              shadow: false,
              text2: "1,200 Jobs",
            }}
          />
          <Card
            obj={{
              text: "Employers",
              col: "#CEDADF",
              src: "card1/low/ic4.svg",
              shadow: false,
              text2: "1,200 Jobs",
            }}
          />
        </div>
      </div>
      <CourseProgram />
      <AroundPpl />
      <Footer/>
    </div>
  );
}

export default Home;
