import React from "react";
import "./Category.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Category() {
  return (
    <motion.div
      className="am"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1,x:150 }}
      transition={{ ease: "easeIn", duration: 0.3 }}
      exit={{ scale: 0.8, transition: { ease: "easeIn", duration: 0.3 } }}
    >
      <CategoryCard title={"Tuition"} />
      <CategoryCard title={"Internship"} />
      <CategoryCard title={"PartTime"} />
      <CategoryCard title={"Freelance"} />
    </motion.div>
  );
}

export function CategoryCard({ title }) {
  const navigate = useNavigate();
  function jobPage() {
    if (title === "Tuition") navigate("/tutorjob");
    else if (title === "Internship") navigate("/internjob");
    else if (title === "PartTime") navigate("/parttimejob");
    else if (title === "Freelance") navigate("/freelancejob");
  }
  return (
    <div className="jam" onClick={jobPage}>
      {title}
    </div>
  );
}

export default Category;
