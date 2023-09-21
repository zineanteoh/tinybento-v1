import React from "react";
import styles from "./Draggable.module.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableIngredient = (props: { children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.children?.toString() || "draggable",
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      className={styles.draggable}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
};

export default DraggableIngredient;
