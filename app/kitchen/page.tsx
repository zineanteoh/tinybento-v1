"use client";
import React, { useEffect, useState } from "react";

import styles from "./page.module.css";
import addIngredientDraggableStyles from "@/components/kitchen/bento/draggable/AddIngredientDraggable.module.css";
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
  DragStartEvent,
  pointerWithin,
} from "@dnd-kit/core";
import { useStore } from "@/store/kitchen-store/store";
import {
  Coordinates,
  DraggableIngredient,
  DraggableType,
  KitchenActionState,
} from "@/utils/interfaces";
import {
  convertDragEventToIngredient,
  convertStringToCoordinate,
} from "@/utils/helper";
import BentoInternalStates from "@/components/dev/BentoInternalStates";
import classNames from "classnames";

const IS_DEV = process.env.NODE_ENV === "development";

const Kitchen = () => {
  // unique id for dnd context
  const id = "kitchen";

  const {
    currentAction,
    setCurrentAction,
    dragging,
    addDroppedIngredient,
    moveIngredient,
    clearAllPreviewIngredients,
    setDragging,
  } = useStore();

  const handleActionClick = (action: KitchenActionState) => {
    if (currentAction === action) {
      setCurrentAction(null);
    } else {
      setCurrentAction(action);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    // get the ingredient that is being dragged
    const ingredient: DraggableIngredient = convertDragEventToIngredient(event);
    // set the dragging state
    setDragging(ingredient);
  };

  // where the magic happens
  const handleDragEnd = (event: DragEndEvent) => {
    // clear all preview
    clearAllPreviewIngredients();

    // ensure it is over a droppable
    if (event.over && event.over.id !== null) {
      // compute the coordinate of the droppable
      const droppedCoordinate: Coordinates = convertStringToCoordinate(
        event.over.id as string
      );

      // compute dragging type
      const draggingType: DraggableType = event.active.data.current?.type;

      // perform action based on dragging type
      switch (draggingType) {
        // adding a new ingredient to bento
        case DraggableType.IN_ADD_INGREDIENT:
          addDroppedIngredient(droppedCoordinate);
          break;

        // moving an existing ingredient in bento
        case DraggableType.IN_BENTO:
          moveIngredient(droppedCoordinate);
          break;
        default:
          console.error("Unknown dragging type");
          break;
      }
    }

    // drag ended, set dragging state to null
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
          <div
            className={classNames(styles.side, {
              [styles.side60]:
                currentAction === KitchenActionState.EDIT_CONTENT,
            })}
          >
            {/* ActionButtons on the left */}
            <div className={styles.actionButtons}>
              <ActionButton
                actionName="Add Ingredient"
                color="#FFCBA6"
                icon={IconPlus}
                onClick={() =>
                  handleActionClick(KitchenActionState.ADD_INGREDIENT)
                }
              />
              <ActionButton
                actionName="Edit Content"
                color="#A8FFB1"
                icon={IconEdit}
                onClick={() =>
                  handleActionClick(KitchenActionState.EDIT_CONTENT)
                }
              />
              <ActionButton
                actionName="Hierarchy"
                color="#AFB7FF"
                icon={IconHierarchy}
                onClick={() => handleActionClick(KitchenActionState.HIERARCHY)}
              />
              <ActionButton
                actionName="Share Bento"
                color="#FED6FF"
                icon={IconShare}
                onClick={() =>
                  handleActionClick(KitchenActionState.SHARE_BENTO)
                }
              />
              <ActionButton
                actionName="Change Theme"
                color="#C0FBFF"
                icon={IconChangeTheme}
                onClick={() =>
                  handleActionClick(KitchenActionState.CHANGE_THEME)
                }
              />
            </div>

            {/* ActionContainer to the right of ActionButtons */}

            <div className={styles.actionContainer}>
              <AnimatePresence>
                {currentAction === KitchenActionState.ADD_INGREDIENT && (
                  <AddIngredients />
                )}
                {currentAction === KitchenActionState.EDIT_CONTENT && (
                  <EditContent />
                )}
                {currentAction === KitchenActionState.HIERARCHY && (
                  <Hierarchy />
                )}
                {currentAction === KitchenActionState.SHARE_BENTO && (
                  <ShareBento />
                )}
                {currentAction === KitchenActionState.CHANGE_THEME && (
                  <ChangeTheme />
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* Bento on the right  */}
          <div
            className={classNames(styles.bento, {
              [styles.bento40]:
                currentAction === KitchenActionState.EDIT_CONTENT,
            })}
          >
            <Bento />
          </div>

          {/* Read: https://docs.dndkit.com/api-documentation/draggable/drag-overlay */}
          <DragOverlay
            dropAnimation={{
              duration: 1,
              easing: "cubic-bezier(.22,.75,.83,.21)",
            }}
          >
            {dragging && (
              <>
                {dragging.type === DraggableType.IN_ADD_INGREDIENT && (
                  // TODO: this will be icons, instead of div + stylings
                  <div className={addIngredientDraggableStyles.draggable}>
                    {dragging.height}x{dragging.width}
                  </div>
                )}

                {dragging.type === DraggableType.IN_BENTO && (
                  // TODO: this will be div + stylings
                  <div>Hello In bento</div>
                )}
              </>
            )}
          </DragOverlay>
        </div>
      </DndContext>

      {IS_DEV && <BentoInternalStates />}
    </div>
  );
};

export default Kitchen;
