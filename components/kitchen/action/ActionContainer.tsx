import React from "react";
import styles from "./ActionContainer.module.css";

const ActionContainer = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default ActionContainer;
