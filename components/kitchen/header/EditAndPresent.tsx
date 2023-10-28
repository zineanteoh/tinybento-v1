import React, { useState } from "react";
import styles from "./EditAndPresent.module.css";
import { IconEdit, IconPlay } from "@/utils/iconLibrary";

export enum KitchenMode {
  Edit = "edit",
  Present = "present",
}

const EditAndPresent = ({
  defaultMode = KitchenMode.Edit,
}: {
  defaultMode?: KitchenMode;
}) => {
  const [mode, setMode] = useState<KitchenMode>(defaultMode);

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
      {/* The icon in the middle */}
      <div
        className={styles.iconContainer}
        style={{ backgroundColor: computeEditPresentIconColor(mode) }}
      >
        <div className={computeEditPresentIconStyle(mode, KitchenMode.Edit)}>
          {IconEdit}
        </div>
        <div className={computeEditPresentIconStyle(mode, KitchenMode.Present)}>
          {IconPlay}
        </div>
      </div>

      {/* The text */}
      <div className={styles.textContainer}>
        <div className="text">Edit</div>
        <br />
        <div className="text">Present</div>
      </div>

      {/* The left-right color overlay */}
      <div
        className={`${
          styles.circularOverlay
        } ${computeEditPresentOverlayPosition(mode)}`}
        style={{
          backgroundColor: computeEditPresentOverlay(mode),
        }}
      />
    </div>
  );
};

export default EditAndPresent;

// helper function
const computeEditPresentIconColor = (mode: KitchenMode) => {
  return mode === KitchenMode.Edit ? "#FFDC62" : "#88DD61";
};

const computeEditPresentIconStyle = (
  mode: KitchenMode,
  isEqual: KitchenMode
) => {
  return `${styles.icon} ${mode === isEqual && styles.active}`;
};

const computeEditPresentOverlay = (mode: KitchenMode) => {
  return mode === KitchenMode.Edit ? "#FFE896" : "#CDFFC5";
};

const computeEditPresentOverlayPosition = (mode: KitchenMode) => {
  return mode === KitchenMode.Edit
    ? styles.overlayOnLeft
    : styles.overlayOnRight;
};
