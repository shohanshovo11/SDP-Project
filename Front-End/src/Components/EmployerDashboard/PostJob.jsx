import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Category from "../PostJob/Category";
import PortalPopUp from "../PortalPopUp";

export default function PostJob() {
  const [postjob, setpostJob] = useState(true);
  function togglePostJob() {
    setpostJob(!postjob);
  }
  return (
    <div>
      {console.log(postjob, "child")}
      {postjob && (
        <div className="grow flex">
          <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
          >
            {
              <PortalPopUp
                overlayColor="rgba(0,0,0, 0.5)"
                placement="Centered"
                onOutsideClick={togglePostJob}
              >
                <Category />
              </PortalPopUp>
            }
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
