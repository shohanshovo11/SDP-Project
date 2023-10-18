import axios from "axios";
import { Navbar } from "../navbar/Navbar";
import styles from "./PostJobtutor.module.css";
import { useState } from "react";
import { toast } from "react-toastify";

const PostJobtutor = () => {
  const [title, setTitle] = useState("");
  const [classs, setClass] = useState();
  const [medium, setMedium] = useState("");
  const [requiredTime, setrequiredTime] = useState();
  const [salary, setsalary] = useState();
  const [location, setlocation] = useState("");
  const [subject, setsubject] = useState("");
  const [description, setdescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    const jobcount=await axios.get(`http://localhost:3002/tutorjobcount`);
    const reqbody={
         salary:salary, 
         studentclass:classs,
         version:medium,
         description:description,
         id: `t${jobcount+1}`,
         location:location,
         subject:subject,
         workingHour:requiredTime,
         title:title
    }
    const response=await axios.post(`http://localhost:3002/tutorjob`,reqbody);
    const data=response.data
    if(!data.acknowledged)
    {
      toast.error("Data couldn't be inserted")
      return
    }
    toast.success("Data successfully inserted")
  };
  return (
    <div className={styles.postJobtutor} >
      <Navbar />
      <section className={styles.postJobtutorChild} />
      <h1 className={styles.post}>Post</h1>
      <h1 className={styles.a}>a</h1>
      <h1 className={styles.job}>Job</h1>
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
          className={styles.postJobtutorItem}
          type="text"
        />
        <input
          required
          onChange={(e) => {
            setClass(e.target.value);
          }}
          className={styles.postJobtutorInner}
          type="number"
        />
        <input
          required
          onChange={(e) => {
            setMedium(e.target.value);
          }}
          className={styles.rectangleInput}
          type="text"
        />
        <input
          required
          onChange={(e) => {
            setrequiredTime(e.target.value);
          }}
          className={styles.postJobtutorChild1}
          type="number"
        />
        <input
          required
          onChange={(e) => {
            setsalary(e.target.value);
          }}
          className={styles.postJobtutorChild2}
          type="number"
        />
        <input
          required
          onChange={(e) => {
            setlocation(e.target.value);
          }}
          className={styles.postJobtutorChild3}
          type="text"
        />
        <input
          required
          onChange={(e) => {
            setsubject(e.target.value);
          }}
          className={styles.postJobtutorChild4}
          type="text"
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

export default PostJobtutor;
