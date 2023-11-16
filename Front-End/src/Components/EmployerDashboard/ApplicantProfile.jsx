import React, { useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

// import { Axios } from "../../api/api";

export const ApplicantProfile = ({ closeModal, isModalOpen }) => {
  //   useEffect(() => {}, []);
  return (
    <Transition show={isModalOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30 flex items-center justify-center"
        onClose={closeModal}
      >
        <div className="bg-white p-8 max-w-md mx-auto rounded-lg">
          {/* Modal Content */}
          <Dialog.Title className="text-2xl font-bold mb-4">
            Profile
          </Dialog.Title>
          <div>{/* Add any additional content here */}</div>
          <div className="flex mt-4 space-x-4">
            <button
              onClick={closeModal}
              className="text-white bg-bt rounded-lg px-4 py-2 hover:bg-slate-600"
            >
              Close
            </button>
            {/* Add other buttons or actions as needed */}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
