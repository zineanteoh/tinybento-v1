import React, { useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Coordinates } from "./Bento";
import { useStore } from "@/store/store";
import { DroppedVariant } from "./Ingredient";

const DroppableBentoSquare = (props: { coordinate: Coordinates }) => {
  const { addIngredient, removeIngredient, clearPreview } = useStore();
  const { x, y } = props.coordinate;

  const { isOver, setNodeRef } = useDroppable({
    id: `${x},${y}`,
  });

  const style = {
    border: "1px solid black",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: isOver ? "green" : undefined,
  };

  useEffect(() => {
    const coordinate = { x, y } as Coordinates;
    if (isOver) {
      clearPreview();
      addIngredient(coordinate, DroppedVariant.PREVIEW);
    }
  }, [isOver, x, y, clearPreview, addIngredient, removeIngredient]);

  return (
    <div ref={setNodeRef} style={style}>
      {isOver ? "Release to Add" : `${x},${y}`}
    </div>
  );
};

export default DroppableBentoSquare;
