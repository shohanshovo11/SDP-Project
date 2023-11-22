import React, { useState } from "react";
import { JobDetailsModal } from "./JobDetailsModal";

export const Internship = (props) => {
  const titleStyle = {
    fontSize: "1rem",
    textAlign: "center",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
  };
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="w-64 mb-4 h-fit max-w-sm bg-white border border-gray-200 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] cursor-pointer hover:shadow-[0_3px_10px_rgb(0,0,0,0.9)] transition duration-300 ease-in-out">
        <div className="flex flex-col items-center pb-5 pt-5">
          <img
            className="w-24 h-24 mb-3 object-cover rounded-full shadow-lg"
            src="/internship.png"
            alt="Bonnie image"
          />
          {/* {console.log(props.tutor._id, "tutor id")} */}
          <h5
            style={titleStyle}
            className="mb-1 text-xl font-medium text-gray-900"
          >
            {props.internship.title}
          </h5>
          <span className="text-sm text-gray-500 ">
            {props.internship.description}
          </span>
          <span className="text-sm text-gray-500 ">
            Area: {props.internship.area}
          </span>
          <span className="text-sm text-gray-500 ">
            Working Time: {props.internship.time}
          </span>

          {/* <div className="my-2">
            {Array.isArray(props.tutor.tags) &&
              props.tutor.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200 last:mr-0 mr-1"
                >
                  {tag}
                </span>
              ))}
          </div> */}

          <h5
            style={titleStyle}
            className=" text-xl pt-1 font-medium text-gray-900"
          >
            Salary: {props.internship.salary}
          </h5>

          <div className="flex mt-1 space-x-3 md:mt-1">
            {/* <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-bt rounded-lg hover:bg-slate-600">
              Apply
            </button> */}
            <button
              onClick={openModal}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-bt rounded-lg hover:bg-slate-600"
            >
              Details
            </button>
          </div>
        </div>
      </div>
      {/* <JobDetailsModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        _id={props.tutor._id}
        postedBy={props.tutor.postedBy}
      /> */}
      {/* Modal */}
    </div>
  );
};
