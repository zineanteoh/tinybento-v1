import React from "react";
import { CONTAINER_HEIGHT, CONTAINER_WIDTH, Dimension } from "./Bento";
import { BentoIngredientType } from "@/store/demo1-store";
import styles from "./Ingredient.module.css";

export enum IngredientVariant {
  DROPPED = "dropped",
  PREVIEW = "preview",
}

interface IngredientProps {
  dimension: Dimension;
  ingredient: BentoIngredientType;
  variant: IngredientVariant;
}

// TODO: hardcode padding here for now
const PADDING = 10;

const Ingredient = ({ dimension, ingredient, variant }: IngredientProps) => {
  // compute the position and size of the ingredient
  const computedStyles = {
    width: (ingredient.width / dimension.width) * CONTAINER_WIDTH - 2 * PADDING,
    height:
      (ingredient.height / dimension.height) * CONTAINER_HEIGHT - 2 * PADDING,
    top:
      (ingredient.coordinate.y / dimension.height) * CONTAINER_HEIGHT + PADDING,
    left:
      (ingredient.coordinate.x / dimension.width) * CONTAINER_WIDTH + PADDING,
  };

  return (
    <>
      {/* Render Dropped */}
      {variant === IngredientVariant.DROPPED && (
        <div
          className={`${styles.ingredient} ${styles.dropped}`}
          style={computedStyles}
        >
          {ingredient.height}x{ingredient.width}
        </div>
      )}

      {/* Render Preview */}
      {variant === IngredientVariant.PREVIEW && (
        <div
          className={`${styles.ingredient} ${styles.preview}`}
          style={computedStyles}
        >
          Preview: {ingredient.height}x{ingredient.width}
        </div>
      )}
    </>
  );
};

export default Ingredient;
