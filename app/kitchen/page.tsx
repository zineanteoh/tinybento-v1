"use client";
import React, { useEffect, useRef } from "react";
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
import { AnimatePresence, useAnimate, useMotionValue } from "framer-motion";
import {
  DndContext,
  DragEndEvent,
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
import BentoOverlay from "@/components/kitchen/bento/BentoOverlay";

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

  // framer animations
  const [scopeSide, animateSide] = useAnimate();
  const [scopeBento, animateBento] = useAnimate();

  useEffect(() => {
    if (currentAction === KitchenActionState.EDIT_CONTENT) {
      animateSide(scopeSide.current, { flexBasis: "60%" }, { duration: 0.2 });
      animateBento(scopeBento.current, { flexBasis: "40%" }, { duration: 0.2 });
    } else {
      animateSide(scopeSide.current, { flexBasis: "40%" }, { duration: 0.2 });
      animateBento(scopeBento.current, { flexBasis: "60%" }, { duration: 0.2 });
    }
  }, [currentAction]);

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
          {/* left side */}
          <div ref={scopeSide} className={styles.side}>
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
          <div ref={scopeBento} className={styles.bento}>
            <Bento />
          </div>

          <BentoOverlay />
        </div>
      </DndContext>
      {IS_DEV && <BentoInternalStates />}
    </div>
  );
};

export default Kitchen;
