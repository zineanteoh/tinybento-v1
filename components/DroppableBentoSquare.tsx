import React, { useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Coordinates } from "@/utils/interfaces";
import { useStore } from "@/store/store";

const DroppableBentoSquare = (props: { coordinate: Coordinates }) => {
  const { addPreviewIngredient, clearAllPreviewIngredients } = useStore();
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
      clearAllPreviewIngredients();
      addPreviewIngredient(coordinate);
    }
  }, [isOver, x, y, clearAllPreviewIngredients, addPreviewIngredient]);

  return (
    <div ref={setNodeRef} style={style}>
      {isOver ? "Release to Add" : `${x},${y}`}
    </div>
  );
};

export default DroppableBentoSquare;
