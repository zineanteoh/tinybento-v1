"use client";
import React, { useState } from "react";

import styles from "./page.module.css";
import KitchenHeader from "@/components/kitchen/header/KitchenHeader";
import ActionButton from "@/components/kitchen/action/ActionButton";
import {
  IconChangeTheme,
  IconEdit,
  IconHierarchy,
  IconPlus,
  IconShare,
} from "@/utils/iconLibrary";
import ActionContainer from "@/components/kitchen/action/ActionContainer";
import Bento from "@/components/kitchen/bento/Bento";

enum Action {
  ADD_INGREDIENT = "Add Ingredient",
  EDIT_CONTENT = "Edit Content",
  HIERARCHY = "Hierarchy",
  SHARE_BENTO = "Share Bento",
  CHANGE_THEME = "Change Theme",
}

const Kitchen = () => {
  const [currentAction, setCurrentAction] = useState<Action | null>(null);

  const handleActionClick = (action: Action) => {
    if (currentAction === action) {
      setCurrentAction(null);
    } else {
      setCurrentAction(action);
    }
  };

  return (
    <div className={styles.container}>
      <KitchenHeader />

      <div className={styles.content}>
        <div className={styles.side}>
          {/* ActionButtons on the left */}
          <div className={styles.actionButtons}>
            <div>{currentAction ? currentAction : "null"}</div>

            <ActionButton
              actionName="Add Ingredient"
              color="#FFCBA6"
              icon={IconPlus}
              onClick={() => handleActionClick(Action.ADD_INGREDIENT)}
            />
            <ActionButton
              actionName="Edit Content"
              color="#A8FFB1"
              icon={IconEdit}
              onClick={() => handleActionClick(Action.EDIT_CONTENT)}
            />
            <ActionButton
              actionName="Hierarchy"
              color="#AFB7FF"
              icon={IconHierarchy}
              onClick={() => handleActionClick(Action.HIERARCHY)}
            />
            <ActionButton
              actionName="Share Bento"
              color="#FED6FF"
              icon={IconShare}
              onClick={() => handleActionClick(Action.SHARE_BENTO)}
            />
            <ActionButton
              actionName="Change Theme"
              color="#C0FBFF"
              icon={IconChangeTheme}
              onClick={() => handleActionClick(Action.CHANGE_THEME)}
            />
          </div>

          {/* ActionContainer to the right of ActionButtons */}

          <div className={styles.actionContainer}>
            {currentAction && <ActionContainer></ActionContainer>}
          </div>
        </div>

        {/* Bento on the right  */}
        <div className={styles.bento}>
          <Bento />
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
