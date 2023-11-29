import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import Footer from "../Footer";
import { NavNolog } from "../navbar/NavNolog";
import { Navbar } from "../navbar/Navbar";
import { Tutor } from "./Tutor";
import { Axios } from "../api/api";
import { Internship } from "./Internship";
import { PartTime } from "./PartTime";
import { Freelance } from "./Freelance";

export const Job = () => {
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("category")
  );
  const tokenAvailable = !!localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const jobMappings = {
    tuition: "tuitionJobs",
    intern: "internJobs",
    partTime: "partTimeJobs",
    freelance: "freelanceJobs",
  };
  const apiUrl = "/jobs";

  const [jobs, setJobs] = useState({});
  const [records, setRecords] = useState([]);
  const fetchData = async () => {
    try {
      const response = await Axios.get(apiUrl);
      const data = response.data;
      setJobs(data);
      setRecords(data[jobMappings[selectedOption]] || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setRecords(jobs[jobMappings[selectedOption]] || []);
  }, [selectedOption]);

  const handleSearchTitle = (searchEvent) => {
    setRecords(
      jobs[jobMappings[selectedOption]].filter((f) =>
        f.title.toLowerCase().includes(searchEvent.target.value.toLowerCase())
      )
    );
  };

  const handleSearchLocation = (searchEvent) => {
    setRecords(
      jobs[jobMappings[selectedOption]].filter((f) =>
        f.area.toLowerCase().includes(searchEvent.target.value.toLowerCase())
      )
    );
  };
  const handleMinSalaryChange = (event) => {
    setMinSalary(event.target.value);
    setRecords(
      jobs[jobMappings[selectedOption]].filter((job) => {
        const jobSalary = parseFloat(job.salary); // Assuming salary is stored as a string, convert it to a number if necessary
        const minSalaryValue =
          event.target.value === "" ? 0 : parseFloat(event.target.value);
        return jobSalary >= minSalaryValue;
      })
    );
    // console.log(event.target.value);
  };

  const handleMaxSalaryChange = (event) => {
    setMaxSalary(event.target.value);
    setRecords(
      jobs[jobMappings[selectedOption]].filter((job) => {
        const jobSalary = parseFloat(job.salary);
        const maxSalaryValue =
          event.target.value === ""
            ? Number.MAX_VALUE
            : parseFloat(event.target.value);
        return jobSalary <= maxSalaryValue;
      })
    );
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
        <div className="bg-white h-screen text-black font-poppins">
          {tokenAvailable ? <Navbar /> : <NavNolog />}
          <hr />
          <div className="flex justify-between px-20 py-4">
            <h2>All Categories</h2>
            <div>
              {/* {console.log(jobs)} */}

              <ul className="flex">
                <li
                  className={`pr-4 ${
                    selectedOption === "tuition" ? "underline" : ""
                  }`}
                  onClick={() => setSelectedOption("tuition")}
                >
                  <a href="#">Tuition</a>
                </li>
                <li
                  className={`pr-4 ${
                    selectedOption === "intern" ? "underline" : ""
                  }`}
                  onClick={() => setSelectedOption("intern")}
                >
                  <a href="#">Internship</a>
                </li>
                <li
                  className={`pr-4 ${
                    selectedOption === "partTime" ? "underline" : ""
                  }`}
                  onClick={() => setSelectedOption("partTime")}
                >
                  <a href="#">Part-time</a>
                </li>
                <li
                  className={`pr-4 ${
                    selectedOption === "freelance" ? "underline" : ""
                  }`}
                  onClick={() => setSelectedOption("freelance")}
                >
                  <a href="#">Freelancing</a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="px-20 flex justify-between py-4">
            <h5 className="">Home/Services/Tution</h5>
            <div>
              <form>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="flex">
                  <input
                    type="search"
                    id="default-search"
                    onChange={handleSearchTitle}
                    className="block w-72 p-3 mr-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-indigo-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for Jobs..."
                    required
                  />
                  <button
                    type="submit"
                    className="text-white right-2.5 bottom-2.5 bg-bt focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-bt"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            {/* <div className="flex">
              <div className="pl-4">
                <h1>
                  <a href="#">Sort By</a>
                </h1>
              </div>
              <div className="pl-4">
                <h1>
                  <a href="#">Newest</a>
                </h1>
              </div>
            </div> */}
          </div>

          <div className="grid grid-cols-5 gap-2 bg-white">
            <div className="grid-cols-1 sticky top-0 h-screen bg white pl-6">
              <div className="flex flex-col">
                <h2 className="pb-2">Salary</h2>
                <div className="flex gap-2 mb-2">
                  <div>
                    <h3>Minimum</h3>
                    <input
                      value={minSalary}
                      onChange={handleMinSalaryChange}
                      type="text"
                      placeholder="Type here"
                      className="input h-10 input-bordered border-2 border-slate-950 focus:border-blue-500 focus:border-2 bg-white input-accent w-full max-w-xs focus:ring-2"
                    />
                  </div>
                  <div>
                    <h3>Maximum</h3>
                    <input
                      value={maxSalary}
                      onChange={handleMaxSalaryChange}
                      type="text"
                      placeholder="Type here"
                      className="input h-10 input-bordered border-2 border-slate-950 focus:border-blue-500 focus:border-2 bg-white input-accent w-full max-w-xs focus:ring-2"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <h3>Location</h3>
                <input
                  type="text"
                  placeholder="Type here"
                  onChange={handleSearchLocation}
                  className="input h-10 border-2 border-slate-950 focus:border-blue-500 focus:border-2 input-bordered bg-white input-accent w-full max-w-xs focus:ring-2
              "
                />
              </div>
              {/* <div>
                <h3>Skills</h3>
                <select
                  className="w-full h-10 border-2 border-slate-950 focus:border-blue-500 focus:border-2 bg-white rounded-md max-w-xs focus:ring-2"
                  data-te-select-init
                  data-te-select-clear-button="true"
                >
                  <option value="1">Select Skills</option>
                  <option value="2">Physics</option>
                  <option value="3">Chemistry</option>
                  <option value="4">Math</option>
                  <option value="5">H.Math</option>
                  <option value="6">Biology</option>
                </select>
              </div>
              <div className="btn grow bg-bt text-slate-50 mt-2">Search</div> */}
            </div>
            <div className="col-span-4 p-5 bg-white flex flex-wrap gap-6">
              {Array.isArray(records) &&
                records.map((job, index) => (
                  <React.Fragment key={index}>
                    {console.log(job, "sdfklasd")}
                    {selectedOption === "tuition" && (
                      <Tutor
                        tutor={{
                          _id: job._id,
                          postedBy: job.email,
                          title: job.title,
                          description: job.description,
                          area: job.area,
                          time: job.workingHour,
                          tags: job.tags,
                          salary: job.salary,
                        }}
                      />
                    )}
                    {selectedOption === "intern" && (
                      <Internship
                        internship={{
                          _id: job._id,
                          postedBy: job.email,
                          title: job.title,
                          description: job.description,
                          area: job.area,
                          time: job.workingHour,
                          salary: job.salary,
                          position: job.position,
                        }}
                      />
                    )}
                    {selectedOption === "partTime" && (
                      <PartTime
                        partTime={{
                          _id: job._id,
                          // postedBy: job.email,
                          title: job.title,
                          description: job.description,
                          time: job.startingTime,
                          workingHour: job.workingHour,
                          salary: job.salary,
                        }}
                      />
                    )}
                    {selectedOption === "freelance" && (
                      <Freelance
                        freelance={{
                          _id: job._id,
                          // postedBy: job.email,
                          title: job.title,
                          description: job.description,
                          task: job.task,
                          workingHour: job.workingHour,
                          deadline: job.deadline,
                          rate: job.rate,
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
