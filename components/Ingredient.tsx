import React from "react";
import { CONTAINER_HEIGHT, CONTAINER_WIDTH, Dimension } from "./Bento";
import { BentoIngredientType } from "@/store/demo1-store";
import styles from "./Ingredient.module.css";
import Resizable from "./Resizable";

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
  const widthPerSquare = CONTAINER_WIDTH / dimension.width;
  const heightPerSquare = CONTAINER_HEIGHT / dimension.height;

  // compute the position and size of the ingredient
  const computedStyles = {
    width: ingredient.width * widthPerSquare - 2 * PADDING,
    height: ingredient.height * heightPerSquare - 2 * PADDING,
    top: ingredient.coordinate.y * heightPerSquare + PADDING,
    left: ingredient.coordinate.x * widthPerSquare + PADDING,
  };

  return (
    <div
      style={{
        position: "absolute",
        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
      }}
    >
      {/* Render Dropped */}
      {variant === IngredientVariant.DROPPED && (
        <Resizable
          childStyleToApply={{
            ...computedStyles,
            backgroundColor: "lightgreen",
          }}
          childWidth={ingredient.width * widthPerSquare - 2 * PADDING}
          childHeight={ingredient.height * heightPerSquare - 2 * PADDING}
          snapXGap={widthPerSquare}
          snapYGap={heightPerSquare}
          startTop={ingredient.coordinate.y * heightPerSquare + 2} // TODO: add 2 to account for top/down border
          startLeft={ingredient.coordinate.x * widthPerSquare + 2} // TODO: add 2 to account for left/right border
        >
          {ingredient.height}x{ingredient.width}
        </Resizable>
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
    </div>
  );
};

export default Ingredient;
