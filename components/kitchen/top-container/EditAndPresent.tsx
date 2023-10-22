import React, { useState } from "react";
import styles from "./EditAndPresent.module.css";

enum KitchenMode {
  Edit = "edit",
  Present = "present",
}

const EditAndPresent = () => {
  const [mode, setMode] = useState<KitchenMode>(KitchenMode.Edit);

  // switch between edit and present mode
  const switchMode = () => {
    if (mode === KitchenMode.Edit) {
      setMode(KitchenMode.Present);
    } else {
      setMode(KitchenMode.Edit);
    }
  };

  return (
    <div className={`no-select ${styles.container}`} onClick={switchMode}>
      <div
        className={styles.circularOverlay}
        style={{ backgroundColor: computeEditPresentOverlay(mode) }}
      />

      <div
        className={styles.circularContainer}
        style={{ backgroundColor: computeEditPresentContainer(mode) }}
      />

      <div className={styles.textContainer}>
        <div>Edit</div>
        <br />
        <div>Present</div>
      </div>
    </div>
  );
};

export default EditAndPresent;

// helper function
const computeEditPresentContainer = (mode: KitchenMode) => {
  if (mode === KitchenMode.Edit) {
    return "#FFDC62";
  } else {
    return "#88DD61";
  }
};

const computeEditPresentOverlay = (mode: KitchenMode) => {
  if (mode === KitchenMode.Edit) {
    return "#FFE896";
  } else {
    return "#CDFFC5";
  }
};
