"use client";
import {
  convertStringToIngredient,
  convertStringToCoordinate,
} from "@/utils/helper";
import { Ingredient } from "@/utils/interfaces";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import { Coordinates } from "@dnd-kit/utilities";
import { useId } from "react";
import styles from "./layout.module.css";
import { useStore } from "@/kitchen-store/kitchen-store";

const KitchenLayout = (props: { children: React.ReactNode }) => {
  const id = useId();
  const { addDroppedIngredient, clearAllPreviewIngredients, setDragging } =
    useStore();

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
    <div className={styles.layout}>
      <DndContext
        id={id}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        autoScroll={false}
        collisionDetection={pointerWithin}
      >
        {props.children}{" "}
      </DndContext>

      {/* Render mobile not available */}
      <div className={`bold ${styles.mobile}`}>
        TinyBento is currently only available on Desktop
      </div>
    </div>
  );
};

export default KitchenLayout;
