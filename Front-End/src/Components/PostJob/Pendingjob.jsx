import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import PendingCard from "./PendingCard";
import { Axios } from "../api/api";

export const Pendingjob = () => {
  const tokenAvailable = !!localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [pendingjob, setPendingJob] = useState([]);
  const [filter, setFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  async function getPendingJobs() {
    const response = await Axios.get(`/pendingjobshow/${filter}`);
    const data = response.data;
    setPendingJob(data);
  }
  useEffect(() => {
    getPendingJobs();
  }, [filter]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
    setActiveFilter(filter);
  };

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
        <div className="bg-white h-screen text-black font-poppins w-full">
          <hr />
          <div className="flex justify-between px-20 py-4">
            <h2
              className={
                activeFilter === "all"
                  ? "cursor-pointer border-b-4 border-black"
                  : "cursor-pointer"
              }
              onClick={() => handleFilterChange("all")}
            >
              All Categories
            </h2>
            <div>
              <ul className="flex">
                <li
                  className={
                    activeFilter === "internship"
                      ? "mr-4 cursor-pointer border-b-4 border-black"
                      : "mr-4 cursor-pointer"
                  }
                  onClick={() => handleFilterChange("internship")}
                >
                  <a>Internship</a>
                </li>
                <li
                  className={
                    activeFilter === "tuition"
                      ? "mr-4 cursor-pointer border-b-4 border-black"
                      : "mr-4 cursor-pointer"
                  }
                  onClick={() => handleFilterChange("tuition")}
                >
                  <a>Tuition</a>
                </li>
                <li
                  className={
                    activeFilter === "parttime"
                      ? "mr-4 cursor-pointer border-b-4 border-black"
                      : "mr-4 cursor-pointer"
                  }
                  onClick={() => handleFilterChange("parttime")}
                >
                  <a>Part-time</a>
                </li>
                <li
                  className={
                    activeFilter === "freelance"
                      ? "mr-4 cursor-pointer border-b-4 border-black"
                      : "mr-4 cursor-pointer"
                  }
                  onClick={() => handleFilterChange("freelance")}
                >
                  <a>Freelancing</a>
                </li>
              </ul>
            </div>
          </div>
          <hr />

          {/* <div className="grid grid-cols-5 gap-2 bg-white"> */}
          <div className="h-[90%] w-full overflow-y-scroll">
            <div className="p-5 bg-white flex flex-wrap gap-6 justify-center overflow-hidden">
              {pendingjob.map((am, index) => (
                <PendingCard pendingjob={am} key={index} />
              ))}
            </div>
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Pendingjob;
