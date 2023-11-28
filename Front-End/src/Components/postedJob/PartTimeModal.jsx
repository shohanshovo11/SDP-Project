import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { Axios } from "../api/api";

export const PartTimeModal = ({ closeModal, isModalOpen, _id, postedBy }) => {
  const [employerInfo, setEmployerInfo] = useState(null); // State to store employer information
  const [jobInfo, setJobInfo] = useState("");

  const handleApplyJob = async () => {
    const employerEmail = postedBy;
    const applicantEmail = localStorage.getItem("email");
    try {
      const response = await Axios.post(`/apply/tuition/${_id}`, {
        employerEmail,
        applicantEmail,
      });
      toast.success("Application Successful");
      closeModal();
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("You have already applied for this job");
      }
    }
  };

  const handleTime = (timeString) =>{
  const hours = parseInt(timeString.substring(0, 2), 10);
  const minutes = parseInt(timeString.substring(2, 4), 10);

  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;

  return formattedTime;
}

  useEffect(() => {
    const getEmployerInfo = async () => {
      try {
        const response = await Axios.get('/getEmployerInfo', {
          params: {
            employerEmail: postedBy,
          },
        });
        //console.log(response.data.employer);
        setEmployerInfo(response.data.employer);
      } catch (error) {
        console.error(error);
      }
    };

    const getJobInfo = async () => {
      try {
        const response = await Axios.get(`/getJobInfo/${_id}`);
        console.log(response.data.job);
        setJobInfo(response.data.job);
        //console.log(String(jobInfo.startingTime));
      }catch (error) {
        console.error(error);
      }
    };

    
    if (isModalOpen) {
      getEmployerInfo();
      getJobInfo();
    }

    
  }, [isModalOpen, postedBy]);

  return (
    <>
      <ToastContainer />
      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30 flex items-center justify-center"
          onClose={closeModal}
        >
          <div className="bg-white p-8 max-w-md mx-auto rounded-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            {employerInfo && (
              <div className="flex flex-col text-slate-600">
                <div className="flex">
                  <div className="flex-1 pr-4">
                    <Dialog.Title className="text-2xl font-bold mb-4">
                      Apply Now!!!
                    </Dialog.Title>
                    <p className="text-lg font-bold">{jobInfo.title}</p>
                    <p>Description: {jobInfo.description}</p>
                    <p>Position: {jobInfo.position}</p>
                    <p>Area: {jobInfo.area}</p>
                    <p>Working Hour: {jobInfo.workingHour}</p>
                    <p className="font-bold">Salary: {jobInfo.salary}</p>
                  </div>

                  <div className="flex-1 pl-4">
                    <h2 className="text-xl font-bold mb-2">Posted By:</h2>
                    <p>Name: {employerInfo.name}</p>
                    <p>Address: {employerInfo.address}</p>
                    <p>Phone Number: {employerInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-4 space-x-4">
                  <button
                    onClick={handleApplyJob}
                    className="text-white bg-bt rounded-lg px-4 py-2 hover:bg-slate-600 flex items-center justify-center"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
