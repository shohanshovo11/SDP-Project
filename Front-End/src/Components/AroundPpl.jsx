import React from "react";
import { Link } from "react-router-dom";

function AroundPpl() {
  return (
    <div className="pt-28 font-poppins flex justify-center bg-white gap-14 pb-28">
      <div className="flex flex-col self-center">
        <p className="text-3xl font-extrabold text-bt w-[30rem] mb-14">
          So Many People are engaged all over the world
        </p>
        <Link
          to="/tutorjob"
          className="btn btn-square bg-bt text-white w-36 rounded-md"
        >
          Post A Job
        </Link>
      </div>
      <div className="w-80">
        <img src="landing/Group.png" />
      </div>
    </div>
  );
}

export default AroundPpl;
