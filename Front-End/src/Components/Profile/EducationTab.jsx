import { Axios } from "../api/api";
import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import ImageModal from "../ImageModal";
import "./style.css";

function EducationTab(props) {
  const [email, setEmail] = useState(window.localStorage.getItem("email"));
  const [edu, setEdu] = useState({});
  const [sscResult, setSscResult] = useState(edu.sscResult || "");
  const [hscResult, setHscResult] = useState(edu.hscResult || "");
  const [currentInstitution, setcurrentInstitution] = useState(
    edu.currentInstitution || ""
  );
  const [deptName, setDeptName] = useState(edu.deptName || "");
  const [bio, setBio] = useState(edu.bio || "");
  const [sscCertificate, setSscCertificate] = useState(
    edu.sscCertificate || ""
  );
  const [hscCertificate, setHscCertificate] = useState(
    edu.hscCertificate || ""
  );
  const [school, setSchool] = useState(edu.school || "");
  const [college, setCollege] = useState(edu.college || "");
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [loading, setLoading] = useState(false);

  const openImageModal = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeImageModal = () => {
    setModalImage("");
    setShowModal(false);
  };

  useEffect(() => {
    setLoading(true);

    Axios.post(
      "/getEducation",
      {
        token: window.localStorage.getItem("token"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => {
        const data = response.data;
        setEdu(data.data || {});
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    console.log(edu, "shovo");
    setSscResult(edu.sscResult);
    setHscResult(edu.hscResult);
    setcurrentInstitution(edu.currentInstitution);
    setDeptName(edu.deptName);
    setBio(edu.bio);
    setSscCertificate(edu.sscCertificate);
    setHscCertificate(edu.hscCertificate);
    setSchool(edu.school);
    setCollege(edu.college);
  }, [edu]);

  //   const checkLoginStatus = () => {
  //   //localStorage.removeItem('token');
  //   const jwtToken = localStorage.getItem('token');
  //   if (jwtToken) {
  //     // console.log(`JWT Token: ${jwtToken}`);
  //     Axios.post('/userData', { token: jwtToken }, { withCredentials: true })
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
      email: email,
      sscResult: sscResult,
      hscResult: hscResult,
      currentInstitution: currentInstitution,
      deptName: deptName,
      bio: bio,
      sscCertificate: sscCertificate,
      hscCertificate: hscCertificate,
      school: school,
      college: college,
    };

    Axios.post("/education", postData)
      .then((res) => {
        if (res.status === 200) {
          console.log("Data sent successfully", res.data);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error("Error sending data:", err);
      });
  };

  const handleSaveClick = () => {
    // console.log("Email: ", email);
    // console.log("SSC Result:", sscResult);
    // console.log("HSC Result:", hscResult);
    // console.log("Institution Name:", currentInstitution);
    // console.log("Department Name:", deptName);
    // console.log("Bio:", bio);
    // console.log("SSC Certificate:", sscCertificate);
    // console.log("HSC Certificate:", hscCertificate);
    sendDataToServer();
  };

  const convertToBase64 = (e, certificateType) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result;

      if (certificateType === "sscCertificate") {
        setSscCertificate(base64Data);
      } else if (certificateType === "hscCertificate") {
        setHscCertificate(base64Data);
      }
      // console.log(`${certificateType} base64:`, base64Data); // Log the base64 data
    };

    if (e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="">
      <div className="group">
        <div className="overlap-group flex flex-col items-center justify-center">
          {loading ? (
            <Dna
              visible={true}
              height="150"
              width="150"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          ) : (
            <div className="mt-8">
              <div className="flex justify-between pt-4 px-10">
                <div className="form-control w-full max-w-xs ">
                  <label className="label">
                    <span className="label-text text-black text-xl">
                      School Name:
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your School"
                    className="input input-bordered w-full max-w-xs "
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text text-black text-xl">
                      College Name:
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your College"
                    className="input input-bordered w-full max-w-xs "
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                  />
                </div>
              </div>
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
                    className="input input-bordered w-full max-w-xs "
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
                    className="input input-bordered w-full max-w-xs "
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
                    className="input input-bordered w-full max-w-xs "
                    value={currentInstitution}
                    onChange={(e) => setcurrentInstitution(e.target.value)}
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
                    className="input input-bordered w-full max-w-xs "
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
                    className="textarea text-lg w-80 h-44 "
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
                        onChange={(e) => convertToBase64(e, "sscCertificate")}
                      ></input>
                    </div>
                    <div className="w-28 h-24 inline-block rounded-md cursor-pointer">
                      {sscCertificate && (
                        <img
                          src={sscCertificate}
                          className="object-contain w-28 h-24 ring ring-bt rounded-md"
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
                        onChange={(e) => convertToBase64(e, "hscCertificate")}
                      ></input>
                    </div>
                    <div className="w-28 h-24 inline-block rounded-md cursor-pointer mb-14">
                      {hscCertificate && (
                        <img
                          src={hscCertificate}
                          className="object-contain w-28 h-24 ring ring-bt rounded-md"
                          onClick={() => openImageModal(hscCertificate)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
