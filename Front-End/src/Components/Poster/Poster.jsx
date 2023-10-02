import React from "react";

function Poster() {
  return (
    <div className="bg-white flex justify-between font-poppins">
      <div className="flex flex-col justify-center px-10">
        <h1 className="text-5xl text-bt font-bold pb-1">
          Find the perfect tuition, part-time and internship jobs for students{" "}
        </h1>
        <span className="pb-6">
          Work with talented students at the most affordable price to get the
          most out of your time and cost.
        </span>
        <div className="mb-3 max-w-xl">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch h-16">
            <input
              type="search"
              className="placeholder-bt relative placeholder-opacity-70 m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none pr-24"
              placeholder="What are you looking for?"
              aria-label="Search"
              aria-describedby="button-addon1"
            />
            <button
              className="bg-bt absolute right-0 z-[2] flex items-center rounded-lg px-8 py-4 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg self-center"
              type="button"
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-md">
        <img src="poster/Frame.svg" alt="poster" />
      </div>
    </div>
  );
}

export default Poster;
