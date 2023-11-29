import React, { useState } from "react";
import "./PendingCard.css";
import { toast } from "react-toastify";
import { Axios } from "../api/api";
import { ModalProfile } from "./ModalProfile";

function PendingCard({ pendingjob }) {
  const [isModalOpen, setModalOpen] = useState(false);
  async function insertpendingjob() {
    const am = await Axios.post(`/approve`, pendingjob);
    const data = am.data;
    if (!data.acknowledged) {
      toast.error("Data couldn't be inserted");
      return;
    }
    toast.success("Data successfully inserted");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  async function deletePendingJob() {
    // console.log("deleting");
    const am = await Axios.delete(`/deletePendingJob`, pendingjob);
    const data = am;
    console.log(data);
    if (!data.status === 200) {
      toast.error("Data couldn't be deleted");
      return;
    }
    toast.success("Data successfully deleted");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <>
      <div className="guava">
        <div className="kola">{pendingjob.title}</div>
        {/* {console.log(pendingjob.rate ? pendingjob.rate : pendingjob.salary)} */}
        <div className="komola">Working Hour: {pendingjob.workingHour}</div>
        <div className="ranoutofname">Desc: {pendingjob.description}</div>
        <div>
          Payment: {pendingjob.rate ? pendingjob.rate : pendingjob.salary}
        </div>
        <div className="flex gap-1 w-full justify-between">
          <button
            className="btn w-20 rounded-lg bg-bt text-white"
            onClick={openModal}
          >
            Profile
          </button>
          <button
            className="btn rounded-lg w-20 bg-bt text-white"
            onClick={insertpendingjob}
          >
            Approve
          </button>
          <button
            className="btn rounded-lg w-20 bg-bt text-white"
            onClick={deletePendingJob}
          >
            Reject
          </button>
        </div>
      </div>
      <ModalProfile
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        pendingJob={pendingjob}
      />
    </>
  );
}

export default PendingCard;
