import React, { PropsWithChildren, ReactNode } from "react";
import styles from "./IngredientDraggable.module.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface IngredientDraggableProps extends PropsWithChildren {
  uniqueId: string;
}

const IngredientDraggable = ({
  children,
  uniqueId,
}: IngredientDraggableProps) => {
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
