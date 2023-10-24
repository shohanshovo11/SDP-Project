//import Profile from "./components/Profile1";
import styles from "./RatingReview.module.css";
import image1 from "../../assets/ratingrev/mobile-loginbro-1.svg";
import { Navbar } from "../navbar/Navbar";
//import Profile1 from "./components/Profile1";

const RatingReview = () => {
  return (
    <div className={styles.ratingReview}>
      <Navbar />
      <div className={styles.frame} />
      <main className={styles.frame1}>
        <div className={styles.frameChild} />
        <div className={styles.giveRating}>Give Rating</div>
        <div
          className={styles.tellMoreAbout}
        >{`Tell  more about your review `}</div>
        <textarea className={styles.frameItem} />
        <input className={styles.frameInner} type="text" />
        <button className={styles.submitWrapper} autoFocus={true}>
          <div className={styles.submit}>Submit</div>
        </button>
        <div className={styles.rate}>Rate</div>
        <div className={styles.an}>an</div>
        <div className={styles.employee}>employee</div>
        <img
          className={styles.mobileLoginBro1}
          alt=""
          src={image1}
        />
        {/* <Profile1 /> */}
      </main>
    </div>
  );
};

export default RatingReview;
