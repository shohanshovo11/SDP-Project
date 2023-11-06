import Footer from "../Footer";
import { Axios } from "../api/api";
import { NavNolog } from "../navbar/NavNolog";
import { Navbar } from "../navbar/Navbar";
import styles from "./PostJobtutor.module.css";
import { useState } from "react";
import { toast } from "react-toastify";

const PostJobtutor = () => {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("token") || "");
  const [noNav, setNoNav] = useState(!jwtToken);

  const [title, setTitle] = useState("");
  const [classs, setClass] = useState();
  const [medium, setMedium] = useState("");
  const [time, setTime] = useState("");
  const [salary, setsalary] = useState(0);
  const [location, setlocation] = useState("");
  const [subject, setsubject] = useState("");
  const [description, setdescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginType = localStorage.getItem("loginType");
    // if (loginType === "employer") {
    const reqbody = {
      email: localStorage.getItem("email"),
      title: title,
      description: description,
      area: location,
      workingHour: time,
      salary: salary,
      version: medium,
      studentClass: classs,
      subject: subject,
      active: false,
      tags: [subject, classs, medium],
    };
    // console.log(reqbody);
    const response = await Axios.post(`/tutorjob`, reqbody);
    const data = response.data;
    if (!data.acknowledged) {
      toast.error("Data couldn't be inserted");
      return;
    }
    toast.success("Data successfully inserted");
    // } else {
    //   toast.error("You are not an employer");
    // }
    // setTimeOut(() =>{
    //   window.location.reload(true)
    // },1000)
  };
  return (
    <div className="font-poppins overflow-hidden bg-[#165069]">
      <div className={`${styles.postJobtutor} mb-20`}>
        {noNav ? <NavNolog /> : <Navbar />}
        {noNav ? (
          <div className="h-full w-full flex items-center justify-center">
            <h1 className="text-5xl font-poppins font-extrabold text-center">
              Please Log in First as Employer
            </h1>
          </div>
        ) : (
          <div className="top-[25.5rem] relative py-10">
            <h1 className="text-white font-poppins font-bold text-5xl left-16 relative">
              Post A Job
            </h1>
            <section
              className={`${styles.postJobtutorChild} rounded-xl font-poppins`}
            />
            <div className={styles.title}>Title</div>
            <div className={styles.class}>Class</div>
            <div className={styles.medium}>Medium</div>
            <div className={styles.requiredTime}>Required Time</div>
            <div className={styles.salary}>Salary</div>
            <div className={styles.location}>Location</div>
            <div className={styles.subject}>Subject</div>
            <div className={styles.description}>Description</div>
            <form onSubmit={handleSubmit}>
              <input
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className={`${styles.postJobtutorItem} pl-4`}
                type="text"
              />

              <input
                required
                onChange={(e) => {
                  setClass(e.target.value);
                }}
                className={`${styles.postJobtutorInner} pl-4`}
                type="number"
              />

              <input
                required
                onChange={(e) => {
                  setMedium(e.target.value);
                }}
                className={`${styles.rectangleInput} pl-4`}
                type="text"
              />

              <input
                required
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                className={`${styles.postJobtutorChild1} pl-4`}
                type="number"
              />

              <input
                required
                onChange={(e) => {
                  e.target.value >= 0
                    ? setsalary(e.target.value)
                    : setsalary(salary);
                }}
                className={`${styles.postJobtutorChild2} pl-4`}
                type="number"
              />

              <input
                required
                onChange={(e) => {
                  setlocation(e.target.value);
                }}
                className={`${styles.postJobtutorChild3} pl-4`}
                type="text"
              />

              <input
                required
                onChange={(e) => {
                  setsubject(e.target.value);
                }}
                className={`${styles.postJobtutorChild4} pl-4`}
                type="text"
              />

              <input
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                className={`${styles.postJobtutorChild5} pl-4`}
                type="text"
              />

              <button
                className={`${styles.groupButton} bg-[#3485a8] text-white text-xl font-semibold hover:bg-slate-500 font-poppins rounded-lg`}
                autoFocus={true}
                type="submit"
              >
                {/* <div className={styles.groupChild} /> */}
                Create Job
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PostJobtutor;
