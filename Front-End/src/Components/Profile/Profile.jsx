import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import { Navbar } from '../navbar/Navbar';
import BasicInfo from './BasicInfo';
import './style.css';

export const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Make the fetch request when the component mounts
    fetch("http://localhost:5000/userData", {
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
        // Set the received data into the user state
        setUser(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    console.log(user, "shovo");
  }, [user]);

  return (
    <>
      <div className='root pb-28'>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        {user && <BasicInfo obj={user} />} {/* Render BasicInfo if user is loaded */}
      </div>
      <Footer />
    </>
  );
}

export default Profile;
