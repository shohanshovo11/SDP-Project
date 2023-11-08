import React, { useState } from "react";
import "./ApplicantList.css";
import { ApplicantListCard } from "./ApplicantListCard";
export const ApplicantList = () => {
  return (
    <>
      <div className="h-full overflow-y-hidden grow">
        <div className="whole-card grid grid-cols-4 gap-8 overflow-y-scroll h-full grow pt-12 pl-20 pb-20">
          <ApplicantListCard
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <ApplicantListCard
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <ApplicantListCard
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <ApplicantListCard
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <ApplicantListCard
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <ApplicantListCard
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <ApplicantListCard
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <ApplicantListCard
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <ApplicantListCard
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <ApplicantListCard
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <ApplicantListCard
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
          <ApplicantListCard
            name="Nishat Tabassum"
            description="UI designer"
            tags={["Figma", "HTML", "CSS"]}
          />
        </div>
      </div>
    </>
  );
};

export default ApplicantList;
