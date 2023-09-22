"use client";
import React from "react";
import styles from "./page.module.css";

import DroppableBento from "@/components/demo-2/DroppableBento";
import { useStore } from "@/store/store";

const Demo2 = () => {
  const { isDropped, dropped } = useStore();

  return (
    <div className={styles.canvas}>
      <DroppableBento>
        {isDropped ? `DROPPED: ${dropped}` : "EMPTY"}
      </DroppableBento>
    </div>
  );
};

export default Demo2;
