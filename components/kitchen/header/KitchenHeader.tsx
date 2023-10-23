import React from "react";
import styles from "./KitchenHeader.module.css";
import EditAndPresent from "@/components/kitchen/header/EditAndPresent";
import HeaderProfile from "@/components/kitchen/header/HeaderProfile";

const KitchenHeader = () => {
  return (
    <div className={styles.header}>
      <HeaderProfile />
      <EditAndPresent />
    </div>
  );
};

export default KitchenHeader;
