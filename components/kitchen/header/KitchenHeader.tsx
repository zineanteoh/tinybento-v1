import React from "react";
import styles from "./KitchenHeader.module.css";
import EditAndPresent from "@/components/kitchen/header/EditAndPresent";

// TODO: don't hardcode
const name = "William";

const KitchenHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.profile}>
        {/* TODO: image goes here */}
        <div className={styles.profileImage} />

        <div className={styles.profileText}>
          <div className={styles.bold}>Welcome</div>
          <div>
            by <span className={styles.bold}>{name}</span>
          </div>
        </div>
      </div>

      <EditAndPresent />
    </div>
  );
};

export default KitchenHeader;
