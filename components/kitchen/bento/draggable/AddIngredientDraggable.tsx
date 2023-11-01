import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import styles from "./AddIngredientDraggable.module.css";
import { DraggableType } from "@/utils/interfaces";

// Read: https://docs.dndkit.com/api-documentation/draggable
const AddIngredientDraggable = ({
  id,
  children,
}: {
  id: string;
  // TODO: remove children because we don't need it
  children?: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { type: DraggableType.IN_ADD_INGREDIENT },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      className={`${styles.draggable} no-select`}
      ref={setNodeRef}
      style={{
        ...style,
      }}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default AddIngredientDraggable;
