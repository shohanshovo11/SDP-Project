import styles from "./CareerGrooming.module.css";
import React from "react";
import { Navbar } from "../navbar/Navbar";


const CareerGrooming = () => {
  return (
    <div className={styles.careerGrooming}>
      <Navbar />
      <h1 className={styles.allCategories}>All categories</h1>
      <h1 className={styles.bestCourses}>Best Courses</h1>
      <h1 className={styles.sortBy}>Sort by</h1>
      <label className={styles.newlyAdded}>Newly Added</label>
      <button className={styles.internship}>{`Internship `}</button>
      <button className={styles.tution}>Tution</button>
      <button className={styles.partTime}>Part-time</button>
      <button className={styles.freelancing}>Freelancing</button>
      <div className={styles.careerGroomingChild} />
      <div className={styles.careerGroomingItem} />
      <img className={styles.vectorIcon} alt="" src="/vector.svg" />
      <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
      <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
      <img className={styles.vectorIcon3} />
      <h1 className={styles.skills}>Skills</h1>
      <h1 className={styles.level}>Level</h1>
      <button className={styles.webDeveloper}>Web Developer</button>
      <button className={styles.easy}>Easy</button>
      <button className={styles.uxDesigner}>UX Designer</button>
      <button className={styles.intermediate}>Intermediate</button>
      <button className={styles.nodejs}>NodeJs</button>
      <button className={styles.hard}>Hard</button>
      <button className={styles.illustrators}>Illustrators</button>
      <div className={styles.careerGroomingInner} />
      <div className={styles.reactTutorialParent}>
        <h3 className={styles.reactTutorial}>React Tutorial</h3>
        <div className={styles.videos}>30 videos</div>
        <div className={styles.frameChild} />
        <div className={styles.frameItem} />
        <div className={styles.frameInner} />
        <div className={styles.figma}>Figma</div>
        <div className={styles.html}>Html</div>
        <div className={styles.css}>Css</div>
        <button className={styles.rectangleButton} autoFocus={true} >View Courses </button>
      </div>
      <div className={styles.nextJsTutorialParent}>
        <div className={styles.nextJsTutorial}>Next JS Tutorial</div>
        <div className={styles.videos}>30 videos</div>
        <div className={styles.frameChild} />
        <div className={styles.frameItem} />
        <div className={styles.frameInner} />
        <div className={styles.figma}>Figma</div>
        <div className={styles.html}>Html</div>
        <div className={styles.css}>Css</div>
        <button className={styles.rectangleButton} autoFocus={true} >View Courses </button>
      </div>
      <div className={styles.nodeJstutorialParent}>
        <h3 className={styles.nodeJstutorial}>Node JSTutorial</h3>
        <div className={styles.videos}>30 videos</div>
        <div className={styles.frameChild} />
        <div className={styles.frameItem} />
        <div className={styles.frameInner} />
        <div className={styles.figma}>Figma</div>
        <div className={styles.html}>Html</div>
        <div className={styles.css}>Css</div>
        <button className={styles.rectangleButton} autoFocus={true} >View Courses </button>
      </div>
      <div className={styles.mongodbTutorialParent}>
        <h3 className={styles.mongodbTutorial}>MongoDB Tutorial</h3>
        <div className={styles.videos}>30 videos</div>
        <div className={styles.frameChild} />
        <div className={styles.frameItem} />
        <div className={styles.frameInner} />
        <div className={styles.figma}>Figma</div>
        <div className={styles.html}>Html</div>
        <div className={styles.css}>Css</div>
        <button className={styles.rectangleButton} autoFocus={true} >View Courses </button>
      </div>
    </div>
  );
};

 export default CareerGrooming;
