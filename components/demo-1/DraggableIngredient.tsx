import React from "react";
import styles from "./Draggable.module.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableIngredient = (props: { content: string }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.content,
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
      {props.content}
    </div>
  );
};

export default DraggableIngredient;
