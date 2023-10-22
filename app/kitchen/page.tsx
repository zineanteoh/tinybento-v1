"use client";
import React, { useState } from "react";

import styles from "./page.module.css";
import Bento from "@/components/Bento";
import EditAndPresent from "@/components/kitchen/top-container/EditAndPresent";

// TODO: don't hardcode
const name = "William";

const Kitchen = () => {
  return (
    <div className={styles.topContainer}>
      <div className={styles.topBar}>
        <div className={styles.profileContainer}>
          {/* TODO: image goes here */}
          <div className={styles.profileImage} />

          <div className={styles.profileTextContainer}>
            <div className={styles.profileBold}>Welcome</div>
            <div>
              by <span className={styles.profileBold}>{name}</span>
            </div>
          </div>
        </div>

        <EditAndPresent />
      </div>
    </div>
  );
};

export default Kitchen;
