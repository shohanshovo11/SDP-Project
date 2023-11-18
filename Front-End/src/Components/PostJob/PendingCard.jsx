import React from "react";
import "./PendingCard.css";
import { toast } from "react-toastify";
import { Axios } from "../api/api";
import ModalProfile from "./ModalProfile";

function PendingCard({ pendingjob }) {
  async function insertpendingjob() {
    const am = await Axios.post(`/approve`, pendingjob);
    const data = am.data;
    if (!data.acknowledged) {
      toast.error("Data couldn't be inserted");
      return;
    }
    toast.success("Data successfully inserted");
  }
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
        <div className="flex gap-4 w-full justify-between">
          <button
            className="peyara"
            onClick={() =>
              document.getElementById("admin_view_profile_modal").showModal()
            }
          >
            View Profile
          </button>
          <button className="peyara" onClick={insertpendingjob}>
            Approve
          </button>
          <button className="peyara">Reject</button>
        </div>
      </div>
      <ModalProfile />
    </>
  );
}

export default PendingCard;
