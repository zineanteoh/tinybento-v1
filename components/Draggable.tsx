import React from "react";
import { useDraggable } from "@dnd-kit/core";

const Draggable = (props: { children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-1",
  });
  const style = transform
    ? {
        width: 100,
        height: 100,
        backgroundColor: "pink",
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {
        width: 100,
        height: 100,
        backgroundColor: "pink",
      };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
};

export default Draggable;
