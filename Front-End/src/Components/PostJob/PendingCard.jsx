import React from "react";
import "./PendingCard.css";
import { toast } from "react-toastify";
import { Axios } from "../api/api";

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
    <div className="guava">
      <div className="kola">{pendingjob.title}</div>

      <div className="komola">Working Hour: {pendingjob.workingHour}</div>
      <div className="ranoutofname">Desc: {pendingjob.description}</div>
      <button className="peyara" onClick={insertpendingjob}>
        Approve
      </button>
    </div>
  );
}

export default PendingCard;
