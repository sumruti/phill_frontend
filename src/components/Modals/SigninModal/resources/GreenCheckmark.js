import React from "react";
import styles from "./SignupIcons.module.css";

const GreenCheckmark = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={styles.container}
      //   width="480"
      //   height="480"
    >
      <path
        d="M 40.601563 12.101563 L 17 35.699219 L 7.398438 26.101563 L 4.601563 29 L 17 41.300781 L 43.398438 14.898438 Z"
        fill="#43a047"
        id="surface1"
      />
    </svg>
  );
};

export default GreenCheckmark;
