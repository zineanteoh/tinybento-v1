import React from "react";
import { useDroppable } from "@dnd-kit/core";

const Droppable = (props: { children: React.ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable-1",
  });
  const style = {
    width: 700,
    height: 700,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

export default Droppable;
