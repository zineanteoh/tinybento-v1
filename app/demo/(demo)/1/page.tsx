"use client";
import React from "react";
import styles from "./page.module.css";

import Bento from "@/components/Bento";

const Demo1 = () => {
  return (
    <div className={styles.canvas}>
      <Bento />
    </div>
  );
};

export default Demo1;
