import React from "react";
import styles from "./Draggable.module.css";
import { useDraggable } from "@dnd-kit/core";

const Draggable = (props: { children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-1",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div className={styles.draggable} ref={setNodeRef} style={style}>
      {props.children}
      <div className={styles.dragHandle} {...listeners} {...attributes}>
        Drag Me
      </div>
    </div>
  );
};

export default Draggable;
