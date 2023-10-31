import React from "react";
import styles from "./IngredientDraggable.module.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// Read: https://docs.dndkit.com/api-documentation/draggable
const IngredientDraggable = ({
  uniqueId,
  children,
}: {
  uniqueId: string;
  // TODO: remove children because we don't need it
  children?: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: uniqueId,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      className={`${styles.draggable} no-select`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default IngredientDraggable;
