"use client";
import React from "react";
import styles from "./page.module.css";

import DroppableBento from "@/components/demo-1/DroppableBento";
import { useStore } from "@/store/store";

const Demo1 = () => {
  const { isDropped, droppedIngredients } = useStore();

  return (
    <div className={styles.canvas}>
      <DroppableBento>
        {isDropped ? `DROPPED: ${droppedIngredients}` : "EMPTY"}
      </DroppableBento>
    </div>
  );
};

export default Demo1;
