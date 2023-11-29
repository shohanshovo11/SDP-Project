import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import Footer from "../Footer";
import { NavNolog } from "../navbar/NavNolog";
import { Navbar } from "../navbar/Navbar";
import axios from "axios";
import ApproveCard from "./ApproveCard";

export const ViewApprove = () => {
  const tokenAvailable = !!localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [viewapprove, setViewApprove] = useState([]);

  
  async function getViewApprove() {
    const response = await axios.get(`http://localhost:5000/viewapprove`);
    const data = response.data;
    setViewApprove(data);
  }


  useEffect(() => {
    getViewApprove();
  });

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full bg-white">
          <Dna
            visible={true}
            height={150}
            width={150}
            ariaLabel="dna-loading"
            className="text-center"
          />
        </div>
      ) : (
        <div className="bg-white h-screen text-black font-poppins">
          {tokenAvailable ? <Navbar /> : <NavNolog />}
          <hr />
          <div className="grid grid-cols-5 gap-2 bg-white">
            <div className="col-span-4 p-5 bg-white flex flex-wrap gap-6 justify-center">
              {viewapprove.map((am, index) => (
                <ApproveCard
                 viewapprove={am}
                  key={index}
                />
              ))}
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      )}
    </>
  );
};
export default ViewApprove;
