import React, { useEffect, useState } from "react";
import { Axios } from "./api/api";
import { Navbar } from "./navbar/Navbar";
import Footer from "./Footer";

const NotificationTable = () => {
  const [notifications, setNotifications] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual endpoint URL
        const assignedResponse = await Axios.get(
          `/getAssignedCandidate/${localStorage.getItem("email")}`
        );

        // Handle the response from the first API call, set the notifications in state
        setNotifications(assignedResponse.data);

        // Extract candidate email from the first API response
        // const candidateEmail = assignedResponse.data.map(
        //   (assignment) => assignment.candidateEmail
        // );

        // Make a second API call using the extracted candidate email
        const jobsAndEmployersResponse = await Axios.get(
          `/appliedJobs/${localStorage.getItem("email")}`
        );

        // Handle the response from the second API call, you can set the data in state
        setAppliedJobs(jobsAndEmployersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-auto p-8 mt-8 mb-24">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Approved Jobs
        </h2>
        <div className="bg-white shadow-md rounded-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employer Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notifications.map((notification, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {notification.jobId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {notification.employerEmail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="text-lg text-gray-400 my-10 font-semibold text-center ">
            You are assigned to these jobs. Please contact with the Employer.
          </h2>
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Applied Jobs
          </h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employer Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appliedJobs.map((job, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">{job.jobId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.employerEmail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default NotificationTable;
