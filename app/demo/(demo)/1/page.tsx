"use client";
import React from "react";
import styles from "./page.module.css";

import DroppableBento from "@/components/demo-1/DroppableBento";

const Demo1 = () => {
  return (
    <div className={styles.canvas}>
      <DroppableBento>EMPTY</DroppableBento>
    </div>
  );
};

export default Demo1;
