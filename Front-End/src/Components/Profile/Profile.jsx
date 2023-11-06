import { Axios } from "../api/api";
import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import Footer from "../Footer";
import { NavNolog } from "../navbar/NavNolog";
import { Navbar } from "../navbar/Navbar";
import FullSection from "./FullSection";
import "./style.css";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [jwtToken, setJwtToken] = useState(localStorage.getItem("token") || "");
  const [noNav, setNoNav] = useState(!jwtToken);

  useEffect(() => {
    setLoading(true);
    if (jwtToken) {
      console.log(`JWT Token: ${jwtToken}`);

      // Create a headers object with the authorization header
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      Axios.post("/userData", {}, { headers }) // Pass headers as the third argument
        .then((res) => {
          setUser(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("JWT Token not found in localStorage");
    }
  }, [jwtToken]);

  return (
    <>
      <div className="root pb-28">
        {noNav ? <NavNolog /> : <Navbar />}

        <br />
        <br />
        <br />
        <br />
        {loading ? (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-100 bg-white z-50">
            <Dna
              visible={true}
              height={150}
              width={150}
              ariaLabel="dna-loading"
            />
          </div>
        ) : (
          user && <FullSection obj={user} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
