import React from "react";
import "./style.css";

function LeftSection(props) {
  const { selector, setSelector } = props;

  return (
    <div>
      <div className="selection flex flex-col">
        <button
          className={`h-1/3 w-full flex items-center `}
          onClick={() => setSelector(1)}
        >
          <div
            className={`h-1/3 transition-all duration-500 ${
              selector === 1 ? "rectangle" : ""
            }`}
          />
          <div
            className={`w-full text-center text-lg ${
              selector === 1
                ? "text-black transition-all duration-500 font-bold"
                : ""
            }`}
          >
            Basic information
          </div>
        </button>
        <button
          className={`h-1/3 w-full flex items-center `}
          onClick={() => setSelector(2)}
        >
          <div
            className={`h-1/3 transition-all duration-500 ${
              selector === 2 ? "rectangle" : ""
            }`}
          />
          <div
            className={`w-full text-center text-lg ${
              selector === 2
                ? "text-black transition-all duration-500 font-bold"
                : ""
            }`}
          >
            Education
          </div>
        </button>
        <button
          className={`h-1/3 w-full flex items-center `}
          onClick={() => setSelector(3)}
        >
          <div
            className={`h-1/3 transition-all duration-500 ${
              selector === 3 ? "rectangle" : ""
            }`}
          />
          <div
            className={`w-full text-center text-lg ${
              selector === 3
                ? "text-black transition-all duration-500 font-bold"
                : ""
            }`}
          >
            CV/Resume
          </div>
        </button>
      </div>
    </div>
  );
}

export default LeftSection;
