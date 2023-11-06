import React from "react";

export default function Modal() {
  return (
    <div className="fixed h-full inset-0 w-full bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="container bg-slate-500 w-fit text-white">
        <div>Employer Profile</div>
      </div>
    </div>
  );
}
