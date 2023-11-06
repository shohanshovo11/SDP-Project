import { Axios } from "../api/api";
import React, { useEffect, useState } from "react";
import ImageModal from "../ImageModal";
import "./style.css";

function CVResumeTab(props) {
  const { email, institution, name } = props.obj;
  const [cvResume, setCvResume] = useState();
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
  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      // setImage(reader.result);
      setCvResume(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  useEffect(() => {
    // Define a function to get the user's token from localStorage
    const getUserToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        return token;
      }
      return null;
    };

    const token = getUserToken();

    if (token) {
      // Make a POST request to the getCvResume route
      Axios.post("/getCvResume", { token })
        .then((response) => {
          if (response.data.status === "ok") {
            setCvResume(response.data.cvResume);
          } else {
            console.error("Error fetching cvResume:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching cvResume:", error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after the API call
        });
    }
  }, []);
  const handleSubmit = () => {
    const token = localStorage.getItem("token"); // Replace "token" with the key you use to store the token in localStorage
    if (!token) {
      console.log("token not found");
      // Handle the case where the token is missing or expired
      return;
    }

    // Define the data you want to send in the request body
    const requestData = {
      token: token,
      cvResume: cvResume,
    };

    // Make an Axios POST request to update the cvResume
    Axios.post("/updateCvResume", requestData) // Replace "/updateCvResume" with your actual API endpoint
      .then((response) => {
        // Handle the response, e.g., show a success message
        console.log("CV/Resume updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors, e.g., show an error message
        console.error("Error updating CV/Resume:", error);
      });
  };

  return (
    <div>
      <div className="group">
        <div className="overlap-group flex flex-col items-center">
          <div className="inline-block align-top">
            <label className="label">
              <span className="label-text text-black text-xl inline-block">
                Upload CV/Resume:
              </span>
            </label>
            <input
              type="file"
              className="p-1 w-96 font-poppins font-light border rounded-md bg-[#455a64] inline-block"
              name="Change Image"
              accept=""
              onChange={convertToBase64}
            ></input>
          </div>
          <div className="pt-4 w-auto h-[30rem] inline-block rounded-md cursor-pointer">
            {cvResume && (
              <img
                src={cvResume}
                className="object-contain w-full h-full ring ring-offset-4 ring-bt rounded-md"
                onClick={() => openImageModal(cvResume)}
              />
            )}
          </div>
        </div>
      </div>
      <button className="text-wrapper-11" onClick={handleSubmit}>
        Save
      </button>
      {showModal && <ImageModal image={modalImage} onClose={closeImageModal} />}
    </div>
  );
}

export default CVResumeTab;
