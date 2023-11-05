 import React from 'react';

export const Tutor = (props) => {
  const titleStyle = {
    fontSize: "1rem",
    textAlign: "center",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
  };

  return(
    <div className="w-64 mb-4 h-fit max-w-sm bg-white border border-gray-200 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="flex flex-col items-center pb-5 pt-5">
        <img
          className="w-24 h-24 mb-3 object-cover rounded-full shadow-lg"
          src="postedjobs/tuition.avif"
          alt="Bonnie image"
        />
        <h5
          style={titleStyle}
          className="mb-1 text-xl font-medium text-gray-900"
        >
          {props.tutor.title}
        </h5>
        <span className="text-sm text-gray-500 ">
          {props.tutor.description}
        </span>
        <span className="text-sm text-gray-500 ">Area: {props.tutor.area}</span>
        <span className="text-sm text-gray-500 ">Time: {props.tutor.time}</span>

        <div className="my-2">
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200 last:mr-0 mr-1">
            { props.tutor.tags[0]}
          </span>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200 last:mr-0 mr-1">
            {props.tutor.tags[1]}
          </span>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200 last:mr-0 mr-1">
            {props.tutor.tags[2]}
          </span>
        </div>
        <h5
          style={titleStyle}
          className=" text-xl pt-1 font-medium text-gray-900"
        >
          Salary: {props.tutor.salary}
        </h5>

        <div className="flex mt-1 space-x-3 md:mt-1">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-bt rounded-lg hover:bg-slate-600"
          >
            Apply
          </a>
        </div>
      </div>
    </div>
  );
};
