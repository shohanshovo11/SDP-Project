import React, { useState } from 'react'
import "./ApproveCard.css"
import axios from "axios"
import RatingReview from './RatingReview';
import PortalPopup from '../PortalPopUp';


function ApproveCard({viewapprove}) {

    const [showpopup,setshowpopup]=useState(false)
  return (
    <div className='guava'>
        <div className='jaima'> 
        <img src={viewapprove.profileImgUrl} className='Pictor'/>
        </div>
        <div className='kola'>
              {viewapprove.name}
        </div>
        
        <div className='komola'>
             Email: {viewapprove.email}
        </div>
        <button className='peyara' onClick={() => setshowpopup(!showpopup)}>
            Give Rating
        </button>
        {showpopup && (
        <PortalPopup
          overlayColor="rgba(0,0,0, 0.5)"
          placement="Centered"
          onOutsideClick={() => setshowpopup(!showpopup)}
        >
          <RatingReview  email={viewapprove.email}/>
        </PortalPopup>
        )}
    </div>
  );
}

export default ApproveCard