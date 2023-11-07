import { Axios } from "../api/api";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageModal from "../ImageModal";
import TextEdit from "./assets/text-edit.png";
import "./style.css";

function BasicInfoTab(props) {
  const {
    email,
    institution,
    name,
    gender,
    age,
    birthDate,
    address,
    phone,
    profileImgUrl,
  } = props.obj;
  // console.log(props.obj);
  function calculate_age(birthDate) {
    var diff_ms = Date.now() - new Date(birthDate).getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  const [showModal, setShowModal] = useState(false);

  const openImageModal = () => {
    setShowModal(true);
  };

  const closeImageModal = () => {
    setShowModal(false);
  };

  // Create individual states for each input field
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 because months are zero-based
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const [emailValue, setEmailValue] = useState(email);
  const [institutionValue, setInstitutionValue] = useState(institution);
  const [nameValue, setNameValue] = useState(name);
  const [phoneValue, setPhoneValue] = useState(phone); // Example default value
  const [genderValue, setGenderValue] = useState(gender); // Example default value
  const [addressValue, setAddressValue] = useState(address); // Example default value
  const [birthdateValue, setBirthdateValue] = useState(formatDate(birthDate)); // Example default value
  const [image, setImage] = useState(profileImgUrl);
  const [ageValue, setAgeValue] = useState(calculate_age(birthdateValue)); // Example default value
  //   console.log(birthDate);

  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const emailRef = useRef(null);
  const genderRef = useRef(null);
  const ageRef = useRef(null);
  const phoneRef = useRef(null);
  const birthdateRef = useRef(null);

  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  const submitInfo = (e) => {
    const user = {
      name: nameValue,
      email: emailValue,
      gender: genderValue,
      birthDate: birthdateValue,
      address: addressValue,
      phone: phoneValue,
      base64: image,
    };

    Axios.post("/update", user)
      .then(function (response) {
        // console.log("User information updated successfully:", response.data);
        window.localStorage.setItem("profileImgUrl", user.base64);
        window.location.reload();
        // const items = { ...localStorage };
        // console.log(items);
      })
      .catch(function (error) {
        toast("Error updating user information");
      });
  };

  const handleBirthdateChange = (e) => {
    setBirthdateValue(e.target.value);
    setAgeValue(calculate_age(e.target.value));
  };

  const handleChange = (e, stateUpdater) => {
    stateUpdater(e.target.value);
  };

  const handleClick = (ref) => {
    ref.current.focus();
  };

  const handleNameChange = (e) => {
    const fullName = e.target.value;
    setNameValue(fullName);
    // console.log(fullName);
  };
  return (
    <div>
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
            value={`${nameValue}`}
            onChange={handleNameChange}
          />
          <input
            ref={addressRef}
            className="address"
            value={addressValue}
            onChange={(e) => handleChange(e, setAddressValue)}
          />
          <input ref={emailRef} className="email" value={emailValue} />
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
          <input ref={ageRef} className="age" value={ageValue} />
          <input
            ref={birthdateRef}
            className="date"
            type="date" // Change input type to 'date'
            value={birthdateValue}
            onChange={handleBirthdateChange} // Use the new handler
          />
          {image == null || image == "" || image === undefined ? (
            <img
              className="photo-frame rounded-full object-cover cursor-pointer ring ring-bt"
              alt="Photo frame"
              src="/profile.svg"
              onClick={openImageModal}
            />
          ) : (
            <img
              className="photo-frame rounded-full ring ring-bt object-cover cursor-pointer"
              alt="Photo frame"
              src={image}
              onClick={openImageModal}
            />
          )}

          <div className="change-photo">
            <input
              type="file"
              className="p-1 w-60 font-poppins font-light border rounded-md bg-[#455a64]"
              name="Change Image"
              accept="image/*"
              onChange={convertToBase64}
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
          <button className="address-edit">
            <img
              alt="Address edit"
              src={TextEdit}
              onClick={() => handleClick(addressRef)}
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
      <button className="text-wrapper-11" onClick={submitInfo}>
        Save
      </button>
      {showModal && <ImageModal image={image} onClose={closeImageModal} />}
      <ToastContainer />
    </div>
  );
}

export default BasicInfoTab;
