"use client";
import React from "react";

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

const Kitchen = () => {
  return (
    <div className={styles.container}>
      <KitchenHeader />

      <div className={styles.content}>
        <div className={styles.side}>
          {/* ActionButtons on the left */}
          <div className={styles.actionButtons}>
            <ActionButton
              actionName="Add Ingredient"
              color="#FFCBA6"
              icon={IconPlus}
            />
            <ActionButton
              actionName="Edit Content"
              color="#A8FFB1"
              icon={IconEdit}
            />
            <ActionButton
              actionName="Hierarchy"
              color="#AFB7FF"
              icon={IconHierarchy}
            />
            <ActionButton
              actionName="Share Bento"
              color="#FED6FF"
              icon={IconShare}
            />
            <ActionButton
              actionName="Change Theme"
              color="#C0FBFF"
              icon={IconChangeTheme}
            />
          </div>

          {/* ActionContainer to the right of ActionButtons */}
          <div className={styles.actionContainer}>
            <ActionContainer>
              {/* TODO: TEMPORARY ONLY */}
              {/* <div style={{ height: "500px", textAlign: "center" }}>Hello</div> */}
            </ActionContainer>
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
