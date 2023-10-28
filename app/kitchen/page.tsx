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
import Bento from "@/components/kitchen/bento/Bento";
import AddIngredients from "@/components/kitchen/action/items/AddIngredients";
import EditContent from "@/components/kitchen/action/items/EditContent";
import Hierarchy from "@/components/kitchen/action/items/Hierarchy";
import ShareBento from "@/components/kitchen/action/items/ShareBento";
import ChangeTheme from "@/components/kitchen/action/items/ChangeTheme";
import { AnimatePresence } from "framer-motion";
import { useStore } from "@/kitchen-store/kitchen-store";

enum Action {
  ADD_INGREDIENT = "Add Ingredient",
  EDIT_CONTENT = "Edit Content",
  HIERARCHY = "Hierarchy",
  SHARE_BENTO = "Share Bento",
  CHANGE_THEME = "Change Theme",
}

const Kitchen = () => {
  const [currentAction, setCurrentAction] = useState<Action | null>(null);

  const { dimension, bentoIngredientList, bentoIngredientGrid, dragging } =
    useStore();

  const handleActionClick = (action: Action) => {
    if (currentAction === action) {
      setCurrentAction(null);
    } else {
      setCurrentAction(action);
    }
  };

  return (
    <div // animate fade in from top gradual, very subtle and subtle. only a tiny bit of animation
      className={styles.container}
    >
      <KitchenHeader />

      <div className={styles.content}>
        <div className={styles.side}>
          {/* ActionButtons on the left */}
          <div className={styles.actionButtons}>
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
            <AnimatePresence>
              {currentAction === Action.ADD_INGREDIENT && <AddIngredients />}
              {currentAction === Action.EDIT_CONTENT && <EditContent />}
              {currentAction === Action.HIERARCHY && <Hierarchy />}
              {currentAction === Action.SHARE_BENTO && <ShareBento />}
              {currentAction === Action.CHANGE_THEME && <ChangeTheme />}
            </AnimatePresence>
          </div>
        </div>
        {/* Bento on the right  */}
        <div className={styles.bento}>
          <Bento />
        </div>

        <div
          style={{
            backgroundColor: "lightblue",
            width: "200px",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            paddingLeft: "10px",
            paddingTop: "25px",
            gap: "10px",
          }}
        >
          <div>
            dimension: {dimension.width}x{dimension.height}
          </div>

          <div>
            dragging: {dragging ? `${dragging.width}x${dragging.height}` : ""}
          </div>

          <div>
            bentoIngredients2D:
            <div>
              {/* row and cols of bentoIngredients2d */}
              {bentoIngredientGrid.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {row.map((col, colIndex) => (
                    <span key={colIndex}>
                      {col ? `[${col.height}x${col.width}]` : <div>[null]</div>}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div>
            bentoIngredients:
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {bentoIngredientList
                .map((ingredient) => {
                  const { width, height } = ingredient;
                  const { x, y } = ingredient.coordinate;
                  const variant = ingredient.variant;
                  return `${height}x${width}, (${x},${y}), ${variant}`;
                })
                .map((data, index) => {
                  return (
                    <span key={index}>
                      {index}: {data}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
