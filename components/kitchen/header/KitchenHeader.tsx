import React from "react";
import styles from "./KitchenHeader.module.css";
import EditAndPresent from "@/components/kitchen/header/EditAndPresent";
import HeaderProfile from "@/components/kitchen/header/HeaderProfile";

// TODO: don't hardcode
const name = "William";

const KitchenHeader = () => {
  return (
    <div className={styles.header}>
      <HeaderProfile name={name} />
      <EditAndPresent />
    </div>
  );
};

export default KitchenHeader;
