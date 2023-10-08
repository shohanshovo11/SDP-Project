import styles from "./Profile.module.css";
// import image2 from "../assets/ratingrev/vector.svg";
// import image3 from "../../assets/ratingrev/vector1.svg";
// import image4 from "../../assets/ratingrev/frame.svg";


const Profile = () => {
  return (
    <div className={styles.profile}>
      <img className={styles.vectorIcon} alt="" src="vector.svg" />
      <img className={styles.vectorIcon1} alt="" src="vector1.svg" />
      <img className={styles.frameIcon} alt="" src="frame.svg" />
    </div>
  );
};

//export default Profile1;
