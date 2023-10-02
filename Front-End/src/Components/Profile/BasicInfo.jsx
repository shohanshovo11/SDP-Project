import React, { useRef, useState } from "react";
import TextEdit from "./assets/text-edit.png";
import "./style.css";

export const BasicInfoBody = (props) => {
  const [value, setInputValue] = useState(props.obj.name);
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const emailRef = useRef(null);
  const genderRef = useRef(null);
  const ageRef = useRef(null);
  const phoneRef = useRef(null);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleClick = (ref) => {
    ref.current.focus();
  };
  return (
    <div className="basic-info-body">
      <div className="group">
        <div className="overlap-group">
          <div className="name">Name :</div>
          <div className="text-wrapper">Address :</div>
          <div className="div">Email :</div>
          <div className="text-wrapper-2">Phone Number :</div>
          <div className="text-wrapper-3">Gender :</div>
          <div className="text-wrapper-4">Age :</div>
          <div className="text-wrapper-5">Birth Date :</div>
          <input
            ref={nameRef}
            className="name-2"
            value={value}
            onChange={handleChange}
          />
          <input
            ref={addressRef}
            className="address"
            defaultValue="14/A Ranking Street"
          />
          <input
            ref={emailRef}
            className="email"
            defaultValue="selena.kyle@gmail.com"
          />
          <input ref={phoneRef} className="phone" defaultValue="01910105531" />
          <input ref={genderRef} className="gender" defaultValue="Male" />
          <input ref={ageRef} className="age" defaultValue="20" />

          <label
            for="countries"
            className="gender block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            id="countries"
            className="bg-gray-50 gender border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a country</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input className="date" type="date" id="birthday" name="birthday" />
          <img
            className="photo-frame rounded-full object-cover"
            alt="Photo frame"
            src="navbar/profile.jpg"
          />
          <div className="change-photo">
            <input type="file" className="p-1 w-60 font-poppins font-light border rounded-md bg-[#455a64]" name="Change Image" accept="image/*"></input>
              {/* <div className="group-2">
                <div className="text-wrapper-6">+</div>
                <div className="text-wrapper-7">Change photo</div>
              </div> */}
          </div>
          <button className="name-edit">
            <img
              alt="Name edit"
              src={TextEdit}
              onClick={() => handleClick(nameRef)}
            />
          </button>
          <button className="age-edit">
            <img alt="Age edit" src={TextEdit} />
          </button>
          <button className="address-edit">
            <img
              alt="Address edit"
              src={TextEdit}
              onClick={() => handleClick(addressRef)}
            />
          </button>
          <button className="email-edit">
            <img
              alt="Email edit"
              src={TextEdit}
              onClick={() => handleClick(emailRef)}
            />
          </button>
          <button className="phone-edit">
            <img
              alt="Phone edit"
              src={TextEdit}
              onClick={() => handleClick(phoneRef)}
            />
          </button>
        </div>
      </div>
      <div className="selection">
        <button className="basic-info">
          <div className="text-wrapper-8">Basic information</div>
          <div className="rectangle" />
        </button>
        <button className="text-wrapper-9">Education</button>
        <button className="text-wrapper-10">CV/Resume</button>
      </div>
      <div className="button">
        <button className="text-wrapper-11">Save</button>
      </div>
    </div>
  );
};

export default BasicInfoBody;
