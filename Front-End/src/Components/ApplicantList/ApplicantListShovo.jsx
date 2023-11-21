import React, { useState } from "react";
import "./ApplicantList.css";
import { ApplicantListCard } from "./ApplicantListCard";
const applicantsData = [
  {
    name: "Sadiqul Alom",
    description: "Description 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  },
  {
    name: "Sabbir",
    description: "Description 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  },
  {
    name: "Nasif",
    description: "Description 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  },
  {
    name: "Rafsan",
    description: "Description 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  },
  {
    name: "Waliza",
    description: "Description 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  },
  {
    name: "Nishat",
    description: "Description 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  },
  {
    name: "Shohan",
    description: "Description 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  },
  {
    name: "Applicant 1",
    description: "Description 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  },
  {
    name: "Abdullah",
    description: "Description 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  },
  {
    name: "Nahid",
    description: "Description 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  },
  {
    name: "Rifat",
    description: "Description 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  },
  {
    name: "Shovo",
    description: "Description 1",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  },
];
export const ApplicantListShovo = () => {
  const itemsPerPage = 6; // Number of applicants to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastApplicant = currentPage * itemsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - itemsPerPage;
  const currentApplicants = applicantsData.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );
  const [activeJob, setActiveJob] = useState("Job 1"); // Default active job
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleJobClick = (job) => {
    setActiveJob(job === activeJob ? null : job);
  };
  return (
    <>
      <div className="h-full font-poppins overflow-x-hidden">
        <div className="flex">
          <div className="pt-12 pl-12 flex flex-col w-96 sticky">
            <h1 className="text-4xl pb-4 font-bold text-center">Live Jobs</h1>
            {["Job 1", "Job 2", "Job 3", "Job 4", "Job 5"].map((job, index) => (
              <button
                key={index}
                onClick={() => handleJobClick(job)}
                className={`btn rounded-md h-8 mb-2 hover:bg-bt hover:text-white ${
                  activeJob === job ? "bg-bt text-white " : "bg-slate-300 "
                }`}
              >
                {job}
              </button>
            ))}
          </div>
          <div className="pr-10 pl-12">
            <h1 className="text-4xl font-bold text-center pt-12 pb-4">
              Applicants
            </h1>
            <div className="whole-card grid grid-cols-3 gap-4">
              {currentApplicants.map((applicant, index) => (
                <ApplicantListCard
                  key={index}
                  name={applicant.name}
                  description={applicant.description}
                  tags={applicant.tags}
                />
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
          </div>
        </div>
      </div>
    </>
  );
};
export default ApplicantListShovo;
