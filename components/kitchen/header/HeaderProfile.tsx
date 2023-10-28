import React from "react";
import styles from "./HeaderProfile.module.css";

const HeaderProfile = ({
  userName,
  bentoName,
}: {
  userName: string;
  bentoName: string;
}) => {
  return (
    <div className={styles.profile}>
      {/* TODO: image goes here */}
      <div className={styles.image} />

      <div className={styles.textContainer}>
        <div className="text bold">{bentoName}</div>
        <div className="text">
          by <span className="bold">{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfile;
