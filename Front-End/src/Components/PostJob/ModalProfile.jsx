import React, { useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Axios } from "../api/api";
export const ModalProfile = ({ closeModal, isModalOpen, pendingJob }) => {
  const [profileData, setProfileData] = useState(null);
  // console.log(pendingJob);

  useEffect(() => {
    if (isModalOpen) {
      Axios.get(`/getEmployerInfo?employerEmail=${pendingJob.email}`)
        .then((response) => {
          setProfileData(response.data.employer); // Assuming response structure has changed
          // console.log(response.data.employer);
        })
        .catch((error) => {
          console.error("Error fetching employer data:", error);
        });
    }
  }, [isModalOpen]);

  return (
    <Transition show={isModalOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30 flex items-center justify-center"
        onClose={closeModal}
      >
        <div className="bg-white p-8 max-w-md mx-auto rounded-lg">
          {profileData ? (
            <>
              <h1 className="text-2xl font-bold mb-4">{profileData.name}</h1>
              <div className="mx-auto w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />

              {/* Add other profile information */}
              <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                Address - {profileData.address}
              </p>

              {/* Add other profile information sections similarly */}

              {/* <div className="flex pt-2">
                <p className="text-gray-600 text-xs lg:text-sm">
                  Gender - {profileData.gender}
                </p>
              </div> */}

              {/* Add other profile information sections similarly */}

              <div className=" pt-2 flex">
                <p className="text-gray-600 text-xs lg:text-sm">
                  Phone - {profileData.number}
                </p>
              </div>
              <div className=" pt-2 pb-4 flex">
                <p className="text-gray-600 text-xs lg:text-sm">
                  Email - {profileData.email}
                </p>
              </div>

              {/* Add the image section similarly */}
              {/* <div className="flex flex-col items-center justify-center">
                <img
                  src={profileData.image}
                  alt="Profile"
                  className="rounded-full w-32 h-32 object-cover shadow-2xl"
                />
              </div> */}
            </>
          ) : (
            <div>Loading...</div>
          )}

          <div className="flex mt-4 space-x-4">
            <button
              onClick={closeModal}
              className="text-white bg-bt rounded-lg px-4 py-2 hover:bg-slate-600"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
