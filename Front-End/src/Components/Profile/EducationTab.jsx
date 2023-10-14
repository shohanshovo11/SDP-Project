import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageModal from "../ImageModal";
import "./style.css";

function EducationTab(props) {
  const [userDetails, setUserDetails] = useState({});
  const [edu, setEdu] = useState({});
  const [sscResult, setSscResult] = useState(edu.sscResult || "");
  const [hscResult, setHscResult] = useState(edu.hscResult || "");
  const [institutionName, setInstitutionName] = useState(
    edu.institutionName || ""
  );
  const [deptName, setDeptName] = useState(edu.deptName || "");
  const [bio, setBio] = useState(edu.bio || "");
  const [sscCertificate, setSscCertificate] = useState(
    edu.sscCertificate || ""
  );
  const [hscCertificate, setHscCertificate] = useState(
    edu.hscCertificate || ""
  );
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const openImageModal = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeImageModal = () => {
    setModalImage("");
    setShowModal(false);
  };

  useEffect(() => {
    fetch("http://localhost:5000/getEducation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEdu(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
  }, []);
  

  useEffect(() => {
    console.log(edu);
    setSscResult(edu.sscResult);
    setHscResult(edu.hscResult);
    setInstitutionName(edu.institutionName);
    setDeptName(edu.deptName);
    setBio(edu.bio);
    setSscCertificate(edu.sscCertificate);
    setHscCertificate(edu.hscCertificate);
  }, [edu]);

  //   const checkLoginStatus = () => {
  //   //localStorage.removeItem('token');
  //   const jwtToken = localStorage.getItem('token');
  //   if (jwtToken) {
  //     // console.log(`JWT Token: ${jwtToken}`);
  //     axios.post('http://localhost:5000/userData', { token: jwtToken }, { withCredentials: true })
  //       .then((res) => {
  //         // console.log(res.data.data);
  //         setUserDetails(res.data.data);
  //         // console.log(userDetails);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     console.log('JWT Token not found in localStorage');
  //   }
  // }

  const sendDataToServer = () => {
    const postData = {
      email: userDetails.email,
      sscResult: sscResult,
      hscResult: hscResult,
      institutionName: institutionName,
      deptName: deptName,
      bio: bio,
      sscCertificate: sscCertificate,
      hscCertificate: hscCertificate,
    };

    axios
      .post("http://localhost:5000/education", postData)
      .then((res) => {
        console.log("Data sent successfully", res.data);
      })
      .catch((err) => {
        console.error("Error sending data:", err);
      });
  };

  const handleSaveClick = () => {
    // Log all the state variables to the console
    console.log("Email: ", userDetails.email);
    console.log("SSC Result:", sscResult);
    console.log("HSC Result:", hscResult);
    console.log("Institution Name:", institutionName);
    console.log("Department Name:", deptName);
    console.log("Bio:", bio);
    console.log("SSC Certificate:", sscCertificate);
    console.log("HSC Certificate:", hscCertificate);
    sendDataToServer();
  };

  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      // Update the appropriate state variable based on the input field
      if (e.target.name === "sscCertificate") {
        setSscCertificate(reader.result);
      } else if (e.target.name === "hscCertificate") {
        setHscCertificate(reader.result);
      }
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  return (
    <div>
      <div className="group">
        <div className="overlap-group flex flex-col items-center justify-center">
            <div>
              <div className="flex justify-between pt-4 px-10">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text text-black text-xl">
                      SSC Result:(GPA)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="SSC Result"
                    className="input input-bordered w-full max-w-xs text-white"
                    value={sscResult}
                    onChange={(e) => setSscResult(e.target.value)}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text text-black text-xl">
                      HSC Result:(GPA)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="HSC Result"
                    className="input input-bordered w-full max-w-xs text-white"
                    value={hscResult}
                    onChange={(e) => setHscResult(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between pt-4 px-10">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text text-black text-xl">
                      Current Institution:
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Institution Name"
                    className="input input-bordered w-full max-w-xs text-white"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text text-black text-xl">
                      Department:
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Dept Name"
                    className="input input-bordered w-full max-w-xs text-white"
                    value={deptName}
                    onChange={(e) => setDeptName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex pt-4 justify-between px-10">
                <div>
                  <label className="label">
                    <span className="label-text text-black text-xl">
                      Short Bio:
                    </span>
                  </label>
                  <textarea
                    placeholder="Bio"
                    className="textarea text-lg w-80 h-44 text-white"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </div>
                <div className="pt-8 flex flex-col pl-32">
                  <div className="pb-8">
                    <div className="inline-block pr-8 xx1 align-top">
                      <label className="label">
                        <span className="label-text text-black text-xl inline-block">
                          Upload SSC Certificate:
                        </span>
                      </label>
                      <input
                        type="file"
                        className="p-1 w-60 font-poppins font-light border rounded-md bg-[#455a64] inline-block"
                        name="sscCertificate"
                        accept="image/*"
                        onChange={convertToBase64}
                      ></input>
                    </div>
                    <div className="w-28 h-24 inline-block rounded-md">
                      {sscCertificate && (
                        <img
                          src={sscCertificate}
                          className="object-contain w-28 h-24"
                          onClick={() => openImageModal(sscCertificate)}
                          />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="inline-block pr-8 xx1 align-top">
                      <label className="label">
                        <span className="label-text text-black text-xl inline-block">
                          Upload HSC Certificate:
                        </span>
                      </label>
                      <input
                        type="file"
                        className="p-1 w-60 font-poppins font-light border rounded-md bg-[#455a64] inline-block"
                        name="hscCertificate"
                        accept="image/*"
                        onChange={convertToBase64}
                      ></input>
                    </div>
                    <div className="w-28 h-24 inline-block rounded-md">
                      {hscCertificate && (
                        <img
                          src={hscCertificate}
                          className="object-contain w-28 h-24"
                          onClick={() => openImageModal(hscCertificate)}
                          />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <button className="text-wrapper-11" onClick={handleSaveClick}>
        Save
      </button>
      {showModal && <ImageModal image={modalImage} onClose={closeImageModal} />}
    </div>
  );
}

export default EducationTab;
