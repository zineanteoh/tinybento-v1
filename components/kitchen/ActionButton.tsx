import React from "react";
import styles from "./ActionButton.module.css";

const ActionButton = ({
  actionName = "Action",
  icon = null,
  color = "#FFDC62",
}: {
  actionName?: string;
  icon?: React.ReactNode;
  color?: string;
}) => {
  return (
    <div className={`no-select ${styles.container}`}>
      <div className={styles.iconContainer} style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className={styles.text}>{actionName}</div>
    </div>
  );
};

export default ActionButton;
