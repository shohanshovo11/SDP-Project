import React, { useState } from "react";

function Aside(props) {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    props.func(buttonName);
  };

  return (
    <>
      <div className="w-96 sticky h-screen bg-slate-800 text-white flex flex-col justify-center items-center font-poppins">
        <div className="text-center text-4xl font-bold py-2">Study WorkNet</div>
        <h1 className="text-center text-2xl pb-6">Admin Dashboard</h1>
        <div class="relative w-24 h-24">
          <img
            class="rounded-full border border-gray-100 shadow-sm w-24 h-24 object-cover"
            src="/navbar/profile.jpg"
            alt="user image"
          />
          <div class="absolute top-0 right-0 h-6 w-6 my-1 border-4 border-white rounded-full bg-green-400 z-2"></div>
        </div>
        <h1 className="text-center text-xl pb-6 pt-4">Hello, Shovo</h1>
        <hr className="bg-white"></hr>
        <div className="flex flex-col w-full">
          <button
            className={`py-2 hover:bg-bt hover:text-white text-xl font-thin w-full text-white ${
              selectedButton === "showProfile" ? "bg-bt" : "text-slate-500"
            }`}
            onClick={() => handleButtonClick("postRequest")}
          >
            Post Requests
          </button>
          <button
            className={`py-2 hover:bg-bt hover:text-white text-xl font-thin w-full text-white ${
              selectedButton === "showElement2" ? "bg-bt" : "text-slate-500"
            }`}
            onClick={() => handleButtonClick("applyRequest")}
          >
            Apply Requests
          </button>
          <button
            className={`py-2 hover:bg-bt hover:text-white text-xl font-thin w-full text-white ${
              selectedButton === "showElement3" ? "bg-bt" : "text-slate-500"
            }`}
            onClick={() => handleButtonClick("showElement3")}
          >
            Employer Verify
          </button>
          <button
            className={`py-2 hover:bg-bt hover:text-white text-xl font-thin w-full text-white ${
              selectedButton === "showElement4" ? "bg-bt" : "text-slate-500"
            }`}
            onClick={() => handleButtonClick("showElement4")}
          >
            Complains
          </button>
        </div>
      </div>
    </>
  );
}

export default Aside;
