import React from "react";
import styles from "./HeaderProfile.module.css";

const HeaderProfile = ({
  userName = "Anonymous",
  bentoName = "Untitled Bento",
}: {
  userName?: string;
  bentoName?: string;
}) => {
  return (
    <div className={styles.profile}>
      {/* TODO: image goes here */}
      <div className={styles.image} />

      <div className={styles.text}>
        <div className={styles.bold}>{bentoName}</div>
        <div>
          by <span className={styles.bold}>{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfile;
