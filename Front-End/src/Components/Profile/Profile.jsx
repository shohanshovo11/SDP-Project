import axios from "axios";
import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import { NavNolog } from '../navbar/NavNolog';
import { Navbar } from '../navbar/Navbar';
import FullSection from './FullSection';
import './style.css';

export const Profile = () => {
  const [user, setUser] = useState(null);

  const [jwtToken, setJwtToken] = useState(localStorage.getItem("token") || "");
  const [noNav, setNoNav] = useState(!jwtToken);

  useEffect(() => {
    if (jwtToken) {
      console.log(`JWT Token: ${jwtToken}`);
      axios
        .post(
          'http://localhost:5000/userData',
          { token: jwtToken },
          { withCredentials: true }
        )
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('JWT Token not found in localStorage');
    }
  }, [jwtToken]);

  return (
    <>
      <div className='root pb-28'>
      {noNav ? <NavNolog /> : <Navbar />}
        <br />
        <br />
        <br />
        <br />
        {user && <FullSection obj={user} />}
      </div>
      <Footer />
    </>
  );
}

export default Profile;
