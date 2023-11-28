import React, { useEffect, useState } from "react";
import { Navbar } from "../navbar/Navbar";
import Footer from "../Footer";
import { Axios } from "../api/api";

function EmployerProfile() {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [institute, setInstitute] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState();
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  // State variable to track whether the profile is in edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchEmployerInfo = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual endpoint URL
        const response = await Axios.get("/getEmployerInfo", {
          params: {
            employerEmail: `${localStorage.getItem("email")}`, // Replace with the actual email
          },
        });

        const { employer } = response.data;
        console.log(employer);
        // Set the state variables based on the fetched data
        setName(employer.name);
        setOccupation(employer.occupation);
        setInstitute(employer.institution);
        setPosition(employer.position);
        setExperience(employer.experience);
        setPhone(employer.number);
        setLocation(employer.address);
      } catch (error) {
        console.error(error);
        // Handle error as needed
      }
    };

    // Call the fetchEmployerInfo function when the component mounts
    fetchEmployerInfo();
  }, []);

  // Function to handle the click on the Edit Profile button
  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  // Function to handle the click on the Save button
  const handleSave = async () => {
    try {
      // Prepare the updated information object
      const updatedInfo = {
        name,
        occupation,
        institution: institute,
        position,
        experience,
        phone,
        address: location,
      };

      // Make the API call to update the employer information
      const response = await Axios.put("/updateEmployerInfo", {
        employerEmail: `${localStorage.getItem("email")}`, // Replace with the actual email
        updatedInfo,
      });

      // Handle the response, you may want to check for success or display a message
      console.log(response.data);

      // Exit edit mode after saving
      setIsEditMode(false);
    } catch (error) {
      // Handle any errors
      console.error("Error updating employer information:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        {/*Main Col*/}
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-bt shadow-2xl bg-white mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">
              {isEditMode ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                name
              )}
            </h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>{" "}
              Occupation -{" "}
              {isEditMode ? (
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              ) : (
                occupation
              )}
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>{" "}
              Institute -{" "}
              {isEditMode ? (
                <input
                  type="text"
                  value={institute}
                  onChange={(e) => setInstitute(e.target.value)}
                />
              ) : (
                institute
              )}
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>{" "}
              Position -{" "}
              {isEditMode ? (
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              ) : (
                position
              )}
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>{" "}
              Experience -{" "}
              {isEditMode ? (
                <input
                  type="text"
                  value={`${experience}`}
                  onChange={(e) => setExperience(e.target.value)}
                />
              ) : (
                `${experience} Years`
              )}
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
              </svg>{" "}
              Phone -{" "}
              {isEditMode ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              ) : (
                phone
              )}
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
              </svg>{" "}
              Location -{" "}
              {isEditMode ? (
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              ) : (
                location
              )}
            </p>

            <div className="pt-12 pb-8 gap-4 flex">
              {isEditMode ? (
                <>
                  <button
                    className="bg-bt hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-bt hover.bg-green-900 text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-2/5">
          <img
            src="/navbar/profile.jpg"
            className="rounded-lg shadow-2xl block"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EmployerProfile;
