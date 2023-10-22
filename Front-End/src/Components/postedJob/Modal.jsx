import React from "react";

export default function Modal() {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white w-1/4 p-4 rounded-lg shadow-md">
        <p className="text-center text-gray-800">Are you sure?</p>
        <div className="mt-4 flex justify-center">
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            // onClick={onApply}
          >
            Apply
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            // onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
