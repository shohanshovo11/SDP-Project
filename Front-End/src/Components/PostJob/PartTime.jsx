import axios from "axios";
import { Navbar } from "../navbar/Navbar";
import styles from "./Freelance.module.css";
import { useState } from "react";
import { toast } from "react-toastify";

const PartTime = () => {
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [workingHour, setWorkingHour] = useState();
  const [time, setTime] = useState();
  const [salary, setSalary] = useState();
  const [description, setdescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    const reqbody={
         email: localStorage.getItem("email"),
         category:"parttime",
         salary:salary, 
         startingTime:time,
         position:position,
         description:description,
         workingHour:workingHour,
         title:title
    }
    const response=await axios.post(`http://localhost:5000/insertjob`,reqbody);
    const data=response.data
    if(!data.acknowledged)
    {
      toast.error("Data couldn't be inserted")
      return
    }
    toast.success("Data successfully inserted")
    setTimeOut(() =>{
      window.location.reload(true)
    },1000)
  };
  return (
    <  div className={styles.postJobtutor} >
      <Navbar />
      <section className={styles.postJobtutorChild} />
      <h1 className={styles.post}>Post</h1>
      <h1 className={styles.a}>a</h1>
      <h1 className={styles.job}>Job</h1>
      <div className={styles.title}>Title</div>
      <div className={styles.class}>Position</div>
      <div className={styles.requiredTime}>Working Hour</div>
      <div className={styles.medium}>Starting Time</div>
      <div className={styles.salary}>Salary</div>
      <div className={styles.description}>Description</div>
      <form onSubmit={handleSubmit}>
        <input
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={styles.postJobtutorItem}
          type="text"
        />
        <input
          required
          onChange={(e) => {
            setPosition(e.target.value);
          }}
          className={styles.postJobtutorInner}
          type="text"
        />
        <input
          required
          onChange={(e) => {
            setWorkingHour(e.target.value);
          }}
          className={styles.rectangleInput}
          type="number"
        />
        <input
          required
          onChange={(e) => {
            setTime(e.target.value);
          }}
          className={styles.postJobtutorChild1}
          type="number"
        />
        <input
          required
          onChange={(e) => {
            setSalary(e.target.value);
          }}
          className={styles.postJobtutorChild2}
          type="number"
        />
        <input
          onChange={(e) => {
            setdescription(e.target.value);
          }}
          className={styles.postJobtutorChild5}
          type="text"
        />
        <button className={styles.groupButton} autoFocus={true} type="submit">
          {/* <div className={styles.groupChild} /> */}
          Create Job
        </button>
      </form>
    </div>
  );
};

export default PartTime;
