import React from "react";
import { IngredientVariant, IngredientProps } from "@/utils/interfaces";
import styles from "./Ingredient.module.css";
import { BENTO_SQUARE_INNER_PADDING } from "@/utils/constants";

/**
 * An ingredient is a draggable and resizable item that can be placed in a bento.
 *
 * It is styled absolutely, relative to the bento container.
 */
const Ingredient = ({
  ingredient, // ingredient data
  variant, // ingredient variant (dropped or preview)
  bentoDimension, // dimension of the bento container e.g. { width: 4, height: 4}
  bentoWidth, // width of the bento container (in px)
  bentoHeight, // height of the bento container (in px)
}: IngredientProps) => {
  // internally compute the size of each square in the bento
  const widthPerSquare = bentoWidth / bentoDimension.width;
  const heightPerSquare = bentoHeight / bentoDimension.height;

  // compute the size and position of the ingredient
  const computedStyles = {
    width: `calc(${
      ingredient.width * widthPerSquare
    }px - 2 * ${BENTO_SQUARE_INNER_PADDING})`, // width of ingredient (in px)
    height: `calc(${
      ingredient.height * heightPerSquare
    }px - 2 * ${BENTO_SQUARE_INNER_PADDING})`, // height of ingredient (in px)
    top: `calc(${
      ingredient.coordinate.y * heightPerSquare
    }px + ${BENTO_SQUARE_INNER_PADDING})`, // relative to the top border of bento container (in px)
    left: `calc(${
      ingredient.coordinate.x * widthPerSquare
    }px + ${BENTO_SQUARE_INNER_PADDING})`, // relative to the left border of bento container (in px)
    backgroundColor: "lightblue",
    borderRadius: "1rem",
  };

  return (
    <>
      {/* Render Dropped */}
      {variant === IngredientVariant.DROPPED && (
        <div
          className={styles.ingredient}
          style={{
            ...computedStyles,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgreen",
          }}
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
