"use client";
import React, { useState } from "react";

import styles from "./page.module.css";
import draggableStyles from "@/components/kitchen/bento/draggable/IngredientDraggable.module.css";
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
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  pointerWithin,
} from "@dnd-kit/core";
import { useStore } from "@/store/kitchen-store/store";
import { Coordinates, Ingredient } from "@/utils/interfaces";
import {
  convertStringToCoordinate,
  convertStringToIngredient,
} from "@/utils/helper";

enum Action {
  ADD_INGREDIENT = "Add Ingredient",
  EDIT_CONTENT = "Edit Content",
  HIERARCHY = "Hierarchy",
  SHARE_BENTO = "Share Bento",
  CHANGE_THEME = "Change Theme",
}

const Kitchen = () => {
  // unique id for dnd context
  const id = "kitchen";
  // handle click action buttons
  const [currentAction, setCurrentAction] = useState<Action | null>(null);
  // handle drag and drop
  const {
    dragging,
    addDroppedIngredient,
    clearAllPreviewIngredients,
    setDragging,
  } = useStore();

  const handleActionClick = (action: Action) => {
    if (currentAction === action) {
      setCurrentAction(null);
    } else {
      setCurrentAction(action);
    }
  };

  const handleDragStart = (event: DragEndEvent) => {
    const ingredient: Ingredient = convertStringToIngredient(
      event.active.id.toString()
    );
    setDragging(ingredient);
  };

  // where the magic happens
  const handleDragEnd = (event: DragEndEvent) => {
    clearAllPreviewIngredients();

    if (event.over && event.over.id !== null) {
      const droppedCoordinate: Coordinates = convertStringToCoordinate(
        event.over.id as string
      );
      // use the APIs provided by store to update bento state
      addDroppedIngredient(droppedCoordinate);
    }

    setDragging(null);
  };

  return (
    <div // animate fade in from top gradual, very subtle and subtle. only a tiny bit of animation
      className={styles.container}
    >
      <KitchenHeader />

      <DndContext
        id={id}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        autoScroll={false}
        collisionDetection={pointerWithin}
      >
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

          {/* Read: https://docs.dndkit.com/api-documentation/draggable/drag-overlay */}
          <DragOverlay>
            {dragging ? (
              <div className={draggableStyles.draggable}>
                {dragging.height}x{dragging.width}
              </div>
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};

export default Kitchen;
