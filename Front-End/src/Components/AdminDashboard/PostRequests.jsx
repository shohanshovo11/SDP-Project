import React, { useEffect, useState } from "react";
import { Axios } from "../api/api";
import Modal from "../Modal/Modal";

export default function PostRequests() {
  const [jobs, setJobs] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  useEffect(() => {
    const fetchInactiveJobs = async () => {
      try {
        const response = await Axios.get("/getInactiveJobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching inactive jobs:", error);
      }
    };

    fetchInactiveJobs();
  }, []);

  const viewProfileHandler = () => {
    console.log("View Profile");
  };
  return (
    <div className="relative w-full">
      <div className="w-full font-poppins">
        <h1 className="text-3xl font-bold text-center py-5">
          Post Requests Of Jobs
        </h1>
        <div className="">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-[#165069] text-white">
                <th className="p-4">Title</th>
                <th className="p-4">Area</th>
                <th className="p-4">Working Hour</th>
                <th className="p-4">Salary</th>
                <th className="p-4">Version</th>
                <th className="p-4">Student Class</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Employer Profile</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td className="p-4 text-center">{job.title}</td>
                  <td className="p-4 text-center">{job.area}</td>
                  <td className="p-4 text-center">{job.workingHour}</td>
                  <td className="p-4 text-center">{job.salary}</td>
                  <td className="p-4 text-center">{job.version}</td>
                  <td className="p-4 text-center">{job.studentClass}</td>
                  <td className="p-4 text-center">{job.subject}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={viewProfileHandler}
                      className="bg-[#165069] text-white px-4 py-2 rounded-md"
                    >
                      View Profile
                    </button>
                  </td>

                  <td className="p-4 text-center">
                    <button className="bg-[#165069] text-white px-4 py-2 mr-4 rounded-md">
                      Accept
                    </button>
                    <button className="bg-[#165069] text-white px-4 py-2 rounded-md">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <Modal /> */}
    </div>
  );
}
