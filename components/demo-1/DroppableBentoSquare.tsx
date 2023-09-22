import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Coordinates } from "./Bento";

const DroppableBentoSquare = (props: { coordinate: Coordinates }) => {
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

  return (
    <div ref={setNodeRef} style={style}>
      {isOver ? "Release to Add" : `${x},${y}`}
    </div>
  );
};

export default DroppableBentoSquare;
