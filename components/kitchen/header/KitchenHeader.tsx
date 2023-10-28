import React from "react";
import styles from "./KitchenHeader.module.css";
import EditAndPresent from "@/components/kitchen/header/EditAndPresent";
import HeaderProfile from "@/components/kitchen/header/HeaderProfile";

// TODO: dont hardcode
const userName = "Graham Hemingway";
const bentoName = "How to fly an airplane";

const KitchenHeader = () => {
  return (
    <div className={styles.header}>
      <HeaderProfile userName={userName} bentoName={bentoName} />
      <EditAndPresent />
    </div>
  );
};

export default KitchenHeader;
