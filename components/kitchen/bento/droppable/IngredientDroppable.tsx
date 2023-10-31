import React, { useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Coordinates } from "@/utils/interfaces";
import { useStore } from "@/store/kitchen-store/store";
import styles from "./IngredientDroppable.module.css";

const IngredientDroppable = (props: { coordinate: Coordinates }) => {
  const { addPreviewIngredient, clearAllPreviewIngredients } = useStore();
  const { x, y } = props.coordinate;

  const { isOver, setNodeRef } = useDroppable({
    id: `${x},${y}`,
  });

  useEffect(() => {
    const coordinate = { x, y } as Coordinates;
    if (isOver) {
      clearAllPreviewIngredients();
      addPreviewIngredient(coordinate);
    }
  }, [isOver, x, y, clearAllPreviewIngredients, addPreviewIngredient]);

  return (
    <div ref={setNodeRef} className={styles.square}>
      {isOver ? "Release to Add" : `${x},${y}`}
    </div>
  );
};

export default IngredientDroppable;
