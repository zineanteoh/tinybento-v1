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
    <div
      className={`no-select ${styles.editAndPresentContainer}`}
      onClick={switchMode}
    >
      <div>Edit</div>
      <div>Present</div>
      <div
        className={styles.circularContainer}
        style={{ backgroundColor: computeEditPresentBg(mode) }}
      />
    </div>
  );
};

export default EditAndPresent;

// helper function
const computeEditPresentBg = (mode: KitchenMode) => {
  if (mode === KitchenMode.Edit) {
    return "#FFDC62";
  } else {
    return "#88DD61";
  }
};
