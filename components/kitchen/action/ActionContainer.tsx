import React from "react";
import styles from "./ActionContainer.module.css";

const ActionContainer = ({
  style,
  children,
}: {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) => {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
};

export default ActionContainer;
