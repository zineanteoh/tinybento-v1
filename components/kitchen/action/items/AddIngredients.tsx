import React from "react";
import styles from "./AddIngredients.module.css";
import { AnimateRightLeft } from "@/utils/animations";
import ActionContainer from "../ActionContainer";

const AddIngredients = () => {
  return (
    <AnimateRightLeft>
      <ActionContainer>
        <div className={styles.container}>
          <div className={styles.miniContainer} />
          <div className={styles.miniContainer} />
          <div className={styles.miniContainer} />
          <div className={styles.miniContainer} />
          <div className={styles.miniContainer} />
          <div className={styles.miniContainer} />
          <div className={styles.miniContainer} />
          <div className={styles.miniContainer} />
          <div className={styles.miniContainer} />
        </div>
      </ActionContainer>
    </AnimateRightLeft>
  );
};

export default AddIngredients;
