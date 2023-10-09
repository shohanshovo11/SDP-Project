import React, { useRef, useState } from "react";
import TextEdit from "./assets/text-edit.png";
import "./style.css";

export const BasicInfoBody = (props) => {
  const { email, institution, name } = props.obj;

  // Create individual states for each input field
  const [emailValue, setEmailValue] = useState(email);
  const [institutionValue, setInstitutionValue] = useState(institution);
  const [firstNameValue, setFirstNameValue] = useState(name.fname);
  const [lastNameValue, setLastNameValue] = useState(name.lname);
  const [phoneValue, setPhoneValue] = useState("01XXXXXXXXX"); // Example default value
  const [genderValue, setGenderValue] = useState("Male"); // Example default value
  const [ageValue, setAgeValue] = useState("20"); // Example default value
  const [addressValue, setAddressValue] = useState("14/A Ranking Street"); // Example default value
  const [birthdateValue, setBirthdateValue] = useState(""); // Example default value

  const [selector, setSelector] = useState(1);
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const emailRef = useRef(null);
  const genderRef = useRef(null);
  const ageRef = useRef(null);
  const phoneRef = useRef(null);
  const birthdateRef = useRef(null);

  const handleBirthdateChange = (e) => {
    setBirthdateValue(e.target.value);
  };

  const handleChange = (e, stateUpdater) => {
    stateUpdater(e.target.value);
  };

  const handleClick = (ref) => {
    ref.current.focus();
  };

  const handleNameChange = (e) => {
    const fullName = e.target.value;
    const [firstName] = fullName.split(" ");
    setFirstNameValue(firstName);
    const lastName = fullName.slice(firstName.length).trim();
    setLastNameValue(lastName);
  };

  return (
    <div className="basic-info-body font-poppins">
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
            value={`${firstNameValue} ${lastNameValue}`}
            onChange={handleNameChange}
          />
          <input
            ref={addressRef}
            className="address"
            value={addressValue}
            onChange={(e) => handleChange(e, setAddressValue)}
          />
          <input
            ref={emailRef}
            className="email"
            value={emailValue}
            onChange={(e) => handleChange(e, setEmailValue)}
          />
          <input
            ref={phoneRef}
            className="phone"
            value={phoneValue}
            onChange={(e) => handleChange(e, setPhoneValue)}
          />
          <select
            ref={genderRef}
            className="gender"
            value={genderValue}
            onChange={(e) => handleChange(e, setGenderValue)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            ref={ageRef}
            className="age"
            value={ageValue}
          />
          <input
            ref={birthdateRef}
            className="date"
            type="date" // Change input type to 'date'
            value={birthdateValue}
            onChange={handleBirthdateChange} // Use the new handler
          />

          <img
            className="photo-frame rounded-full object-cover"
            alt="Photo frame"
            src="navbar/profile.jpg"
          />
          <div className="change-photo">
            <input
              type="file"
              className="p-1 w-60 font-poppins font-light border rounded-md bg-[#455a64]"
              name="Change Image"
              accept="image/*"
            ></input>
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
      <div className="selection flex flex-col ">
        <button
          className={`h-1/3 w-full flex items-center `}
          onClick={() => setSelector(1)}
        >
          <div
            className={`h-1/3 transition-all duration-500 ${
              selector === 1 ? "rectangle" : ""
            }`}
          />
          <div
            className={`w-full text-center text-lg ${
              selector === 1
                ? "text-black transition-all duration-500 font-bold"
                : ""
            }`}
          >
            Basic information
          </div>
        </button>
        <button
          className={`h-1/3 w-full flex items-center `}
          onClick={() => setSelector(2)}
        >
          <div
            className={`h-1/3 transition-all duration-500 ${
              selector === 2 ? "rectangle" : ""
            }`}
          />
          <div
            className={`w-full text-center text-lg ${
              selector === 2
                ? "text-black transition-all duration-500 font-bold"
                : ""
            }`}
          >
            Education
          </div>
        </button>
        <button
          className={`h-1/3 w-full flex items-center `}
          onClick={() => setSelector(3)}
        >
          <div
            className={`h-1/3 transition-all duration-500 ${
              selector === 3 ? "rectangle" : ""
            }`}
          />
          <div
            className={`w-full text-center text-lg ${
              selector === 3
                ? "text-black transition-all duration-500 font-bold"
                : ""
            }`}
          >
            CV/Resume
          </div>
        </button>
      </div>
      <button className="text-wrapper-11">Save</button>
    </div>
  );
};

export default BasicInfoBody;
