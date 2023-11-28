import React, { useEffect, useState } from "react";
import "./ApplicantList.css";
import { ApplicantListCard } from "./ApplicantListCard";
import { Axios } from "../api/api";
// const applicantsData = [
//   {
//     name: "Sadiqul Alom",
//     description: "Description 1",
//     tags: ["Tag 1", "Tag 2", "Tag 3"],
//   },
//   {
//     name: "Sabbir",
//     description: "Description 1",
//     tags: ["Tag 1", "Tag 2", "Tag 3"],
//   },
//   {
//     name: "Nasif",
//     description: "Description 1",
//     tags: ["Tag 1", "Tag 2", "Tag 3"],
//   },
//   {
//     name: "Rafsan",
//     description: "Description 1",
//     tags: ["Tag 1", "Tag 2", "Tag 3"],
//   },
//   {
//     name: "Waliza",
//     description: "Description 1",
//     tags: ["Tag 1", "Tag 2", "Tag 3"],
//   },
//   {
//     name: "Nishat",
//     description: "Description 1",
//     tags: ["Tag 1", "Tag 2", "Tag 3"],
//   },
//   {
//     name: "Shohan",
//     description: "Description 1",
//     tags: ["Tag 1", "Tag 2", "Tag 3"],
//   },
//   {
//     name: "Applicant 1",
//     description: "Description 1",
//     tags: ["Tag 1", "Tag 2", "Tag 3"],
//   },
//   {
//     name: "Abdullah",
//     description: "Description 1",
//     tags: ["Tag 1", "Tag 2", "Tag 3"],
//   },
//   {
//     name: "Nahid",
//     description: "Description 1",
//     tags: ["Tag 1", "Tag 2", "Tag 3"],
//   },
//   {
//     name: "Rifat",
//     description: "Description 1",
//     tags: ["Tag 1", "Tag 2", "Tag 3"],
//   },
//   {
//     name: "Shovo",
//     description: "Description 1",
//     tags: ["Tag 1", "Tag 2", "Tag 3"],
//   },
// ];
export const ApplicantListShovo = () => {
  const [jobs, setJobs] = useState([]);
  const [applicantsData, setApplicantsData] = useState([]); // Array of applicants for the active job
  const itemsPerPage = 6; // Number of applicants to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastApplicant = currentPage * itemsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - itemsPerPage;
  const currentApplicants = applicantsData.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );
  const [activeJob, setActiveJob] = useState(); // Default active job
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const email = localStorage.getItem("email");
    Axios.get(`/jobs/${email}`)
      .then((response) => {
        setJobs(response.data.jobs);
        setActiveJob(response.data.jobs[0]._id);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);
  const handleJobClick = async (job) => {
    try {
      setActiveJob((prevActiveJob) =>
        prevActiveJob === job._id ? null : job._id
      );

      const response = await Axios.get(`/candidatelist/${job._id}`);
      const applicants = response.data;
      console.log(
        `Successfully fetched applicants for job "${job.title}":`,
        applicants
      );
      setApplicantsData(applicants);
    } catch (error) {
      console.error(`Error fetching applicants for job "${job.title}":`, error);
    }
  };
  return (
    <>
      <div className="h-full grow font-poppins overflow-x-hidden">
        <div className="flex">
          <div className="pt-12 px-6 flex flex-col w-96 h-screen overflow-y-scroll sticky">
            <h1 className="text-4xl pb-4 font-bold text-center">Live Jobs</h1>
            {jobs.map((job, index) => (
              <button
                key={index}
                onClick={() => handleJobClick(job)}
                className={`btn rounded-md h-8 mb-2 hover:bg-bt hover:text-white ${
                  activeJob === job._id
                    ? "bg-bt text-white"
                    : "bg-slate-300 text-black"
                }`}
              >
                {job.title}
              </button>
            ))}
          </div>
          <div className="pr-10 pl-12 flex-grow">
            {" "}
            {applicantsData.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center text-xl ">
                No Applicant Found
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-center pt-12 pb-4">
                  Applicants
                </h1>
                <div className="grid grid-cols-3 gap-4">
                  {currentApplicants.map((applicant, index) => (
                    <>
                      {console.log(applicant, "shovo")}
                      <ApplicantListCard
                        key={index}
                        applicant={applicant}
                        jobId={activeJob}
                        // name={applicant.name}
                        // description={applicant.description}
                        // tags={applicant.tags}
                      />
                    </>
                  ))}
                </div>
                <div className="pagination flex gap-2 mt-6">
                  {Array.from(
                    { length: Math.ceil(applicantsData.length / itemsPerPage) },
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`btn-pagination hover:text-black btn-circle text-black ${
                          currentPage === index + 1
                            ? "btn bg-bt active text-white"
                            : "btn bg-slate-300"
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantListShovo;
