import React, { useId } from "react";
import { BentoIngredientType, DraggableType } from "@/utils/interfaces";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const IngredientDropped = ({
  ingredient,
  computedStyles,
  children,
}: {
  ingredient: BentoIngredientType;
  computedStyles?: React.CSSProperties;
  children?: React.ReactNode;
}) => {
  const uuid = useId();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    // 4x4-bento-uuid
    id: `${ingredient.height}x${ingredient.width}-bento-${uuid}`,
    data: { type: DraggableType.IN_BENTO, coordinate: ingredient.coordinate },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      className="cursor-move"
      style={{
        ...style,
        ...computedStyles,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgreen",
        position: "absolute",
        border: "1px solid black",
      }}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default IngredientDropped;
