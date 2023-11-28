import React, { useState } from "react";
import "./ApplicantList.css";
import profile from "../Images/profile.png";
import { ApplicantProfile } from "../EmployerDashboard/ApplicantProfile";
import { Dialog } from "@headlessui/react";
import { Axios } from "../api/api";

export const ApplicantListCard = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  const handleViewProfile = () => {
    openModal();
  };

  const handleAccept = () => {
    openConfirmationModal();
  };

  const handleAcceptConfirmation = () => {
    // Perform actions when the "Accept" button in the confirmation modal is clicked
    // For example, you can make an API call to update the applicant status
    // Close the confirmation modal
    console.log(props.applicant, props.jobId);
    Axios.put(`/accept/${props.jobId}/${props.applicant.email}`, {
      email: props.applicant.email,
    })
      .then((res) => {
        console.log(res);
        alert("Applicant Accepted");
      })
      .catch((err) => {
        console.log(err);
      });
    closeConfirmationModal();
  };

  return (
    <div className="w-56 h-64 bg-[#8dffd041] flex flex-col justify-between items-center rounded-md shadow-lg shadow-slate-400">
      <img
        className="rounded-full w-24 h-24 object-contain pt-4"
        src={
          props.applicant.profileImgUrl ? props.applicant.profileImgUrl : null
        }
        alt="Profile image"
      />
      <h5 className="">{props.applicant.name}</h5>
      <span className="">{props.applicant.phone}</span>
      <div className="mb-4 flex gap-7">
        <button
          className="bg-bt text-white text-sm rounded-3xl px-2 py-1"
          onClick={handleViewProfile}
        >
          View Profile
        </button>
        <button
          className="bg-bt text-white text-sm rounded-3xl px-2 py-1"
          onClick={handleAccept}
        >
          Accept
        </button>
      </div>

      {/* View Profile Modal */}
      <ApplicantProfile closeModal={closeModal} isModalOpen={isModalOpen} />

      {/* Accept Confirmation Modal */}
      <Dialog
        open={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-75" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  {/* Heroicon name: exclamation */}
                  <svg
                    className="h-6 w-6 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m0-16s4.5 4 8 8-8 8-8 8m8-16s-8 4-8 8"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Accept Applicant
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to accept this applicant?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleAcceptConfirmation}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-bt text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={closeConfirmationModal}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ApplicantListCard;
