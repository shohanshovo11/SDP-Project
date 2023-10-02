import React from "react";
import Message from "./assets/group-34292.png";
import Noti from "./assets/group-34297.png";
import Profile from "./assets/group.png";
import './style.css';

export const DropShadowedNav = () => {
  return (
    <div className="drop-shadowed-nav">
      <div className="navigation-bar">
        <div className="frame">
          
          <button className="text-wrapper"><div>Home<div className="rectangle" /></div></button>
          <button className="text-wrapper">About</button>
          <button className="text-wrapper">Job Category</button>
          <button className="text-wrapper">Contact</button>

        </div>
        
        <div className="text-wrapper-2">Study WorkNet</div>
        <button><img className="img" alt="Group" src={Message} /></button>
        <button><img className="group-2" alt="Group" src={Noti} /></button>
        <button><img className="group-3" alt="Group" src={Profile} /></button>
        
      </div>
    </div>
  );
};
export default DropShadowedNav