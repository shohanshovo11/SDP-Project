import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import Footer from "../Footer";
import { NavNolog } from "../navbar/NavNolog";
import { Navbar } from "../navbar/Navbar";
import axios from "axios";
import PendingCard from "./PendingCard";

export const Pendingjob = () => {
  const tokenAvailable = !!localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [pendingjob, setPendingJob] = useState([]);
  const [filter,setFilter]=useState("all");

  
  async function getPendingJobs() {
    const response = await axios.get(`http://localhost:5000/pendingjobshow/${filter}`);
    const data = response.data;
    setPendingJob(data);
  }


  useEffect(() => {
    getPendingJobs();
  }, [filter]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full bg-white">
          <Dna
            visible={true}
            height={150}
            width={150}
            ariaLabel="dna-loading"
            className="text-center"
          />
        </div>
      ) : (
        <div className="bg-white h-screen text-black font-poppins">
          {tokenAvailable ? <Navbar /> : <NavNolog />}
          <hr />
          <div className="flex justify-between px-20 py-4 ">
            <h2 className="cursor-pointer" onClick={() =>{
              setFilter("all")
            }}>All Categories</h2>
            <div>
              <ul className="flex">
                <li className="pr-4 cursor-pointer" onClick={() =>{
                  setFilter("internship")
                }}>
                  <a>Internship</a>
                </li>
                <li className="pr-4 cursor-pointer" onClick={() =>{
                  setFilter("tuition")
                }}>
                  <a>Tution</a>
                </li>
                <li className="pr-4 cursor-pointer" onClick={() =>{
                  setFilter("parttime")
                }}>
                  <a>Part-time</a>
                </li>
                <li className="pr-4 cursor-pointer" onClick={() =>{
                  setFilter("freelance")
                }}>
                  <a>Freelancing</a>
                </li>
              </ul>
            </div>
          </div>
          <hr />

          <div className="grid grid-cols-5 gap-2 bg-white">
            <div className="col-span-4 p-5 bg-white flex flex-wrap gap-6 justify-center">
              {pendingjob.map((am, index) => (
                <PendingCard
                  pendingjob={am}
                  key={index}
                />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
export default Pendingjob;
