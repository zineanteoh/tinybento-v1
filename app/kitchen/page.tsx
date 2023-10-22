"use client";
import React from "react";

import styles from "./page.module.css";
import KitchenHeader from "@/components/kitchen/header/KitchenHeader";

const Kitchen = () => {
  return (
    <div className={styles.container}>
      <KitchenHeader />

      {/* TODO: add left side bar */}

      {/* TODO: add bento box */}
    </div>
  );
};

export default Kitchen;
