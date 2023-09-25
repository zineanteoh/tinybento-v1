import React from "react";
import { CONTAINER_HEIGHT, CONTAINER_WIDTH, Dimension } from "./Bento";
import { BentoIngredientType } from "@/store/demo1-store";
import styles from "./Ingredient.module.css";

export enum DroppedVariant {
  VIEWABLE = "viewable",
  PREVIEW = "preview",
}

interface DroppedIngredientProps {
  dimension: Dimension;
  ingredient: BentoIngredientType;
  variant: DroppedVariant;
}

const DroppedIngredient = ({
  dimension,
  ingredient,
  variant,
}: DroppedIngredientProps) => {
  return (
    <div
      className={`${styles.ingredient} ${
        variant === DroppedVariant.VIEWABLE ? styles.viewable : styles.preview
      }`}
      style={{
        width: (ingredient.width / dimension.width) * CONTAINER_WIDTH - 20,
        height: (ingredient.height / dimension.height) * CONTAINER_HEIGHT - 20,
        top:
          (ingredient.coordinate.y / dimension.height) * CONTAINER_HEIGHT + 10,
        left:
          (ingredient.coordinate.x / dimension.width) * CONTAINER_WIDTH + 10,
      }}
    >
      {ingredient.height}x{ingredient.width}
    </div>
  );
};

export default DroppedIngredient;
