import React from "react";
import styles from "./ActionButton.module.css";

const ActionButton = ({
  actionName,
  icon,
  color,
  onClick,
}: {
  actionName: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}) => {
  return (
    <div className={`no-select ${styles.container}`} onClick={onClick}>
      <div className={styles.iconContainer} style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className={`text bold ${styles.text}`}>{actionName}</div>
    </div>
  );
};

export default ActionButton;
