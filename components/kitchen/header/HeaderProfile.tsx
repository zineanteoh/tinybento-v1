import React from "react";
import styles from "./HeaderProfile.module.css";

const HeaderProfile = ({ name }: { name: string }) => {
  return (
    <div className={styles.profile}>
      {/* TODO: image goes here */}
      <div className={styles.image} />

      <div className={styles.text}>
        <div className={styles.bold}>Welcome</div>
        <div>
          by <span className={styles.bold}>{name}</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfile;
