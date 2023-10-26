import React from "react";
import styles from "./Bento.module.css";
import { AnimateFadeDrop } from "@/utils/animations";

const Bento = () => {
  return (
    <AnimateFadeDrop>
      <div className={styles.container} />
    </AnimateFadeDrop>
  );
};

export default Bento;
