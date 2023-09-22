import React from "react";
import { useDroppable } from "@dnd-kit/core";

const DroppableBento = (props: { children: React.ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable-1",
  });
  const style = {
    width: 700,
    height: 700,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: isOver ? "green" : undefined,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {isOver ? "Release to Add" : props.children}
    </div>
  );
};

export default DroppableBento;
