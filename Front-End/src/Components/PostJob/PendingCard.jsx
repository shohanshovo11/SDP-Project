import React from 'react'
import "./PendingCard.css"
import axios from "axios"
import { toast } from "react-toastify";


function PendingCard({pendingjob}) {

  async function insertpendingjob()
  {
    let response
    const vari=pendingjob
    if(pendingjob.category==="tuition")
    {
    response = await axios.get(`http://localhost:5000/tuitionjobcount`);
    }
    else if(pendingjob.category==="internship")
    {
    response = await axios.get(`http://localhost:5000/internjobcount`);
    }
    else if(pendingjob.category==="parttime")
    {
    response = await axios.get(`http://localhost:5000/parttimejobcount`);
    }
    else if(pendingjob.category==="freelance")
    {
    response = await axios.get(`http://localhost:5000/freelancejobcount`);
    }
    const am=await axios.post(`http://localhost:5000/approve/${response.data+1}`,vari);
    const data = am.data
    if (!data.acknowledged) {
      toast.error("Data couldn't be inserted");
      return;
    }
    toast.success("Data successfully inserted");
  }
  return (
    <div className='guava'>
        <div className='kola'>
              {pendingjob.title}
        </div>
        
        <div className='komola'>
             Working Hour: {pendingjob.workingHour}
        </div>
        <div className='ranoutofname'>
            Skills: {pendingjob.description}
        </div>
        <button className='peyara' onClick={insertpendingjob}>
            Approve
        </button>
    </div>
  )
}

export default PendingCard