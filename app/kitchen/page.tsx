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

const Kitchen = () => {
  return (
    <div className={styles.container}>
      <KitchenHeader />

      <div className={styles.content}>
        <div className={styles.side}>
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

          {/* TODO: add ActionContainer here */}
        </div>
        <div className={styles.main}>
          {/* TODO: place Bento here, touching the very left side of main */}
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
