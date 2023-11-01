import React from "react";
import { IngredientVariant, IngredientProps } from "@/utils/interfaces";
import { BENTO_SQUARE_INNER_PADDING } from "@/utils/constants";
import IngredientDropped from "../draggable/BentoIngredientDraggable";
import IngredientPreview from "./IngredientPreview";

/**
 * An ingredient is a draggable item that is placed in a bento, either as a preview or dropped.
 *
 * It is styled absolutely, relative to the bento container.
 */
const BentoIngredient = ({
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
        <IngredientDropped
          ingredient={ingredient}
          computedStyles={computedStyles}
        >
          {ingredient.height}x{ingredient.width}
        </IngredientDropped>
      )}

      {/* Render Preview */}
      {variant === IngredientVariant.PREVIEW && (
        <IngredientPreview computedStyles={computedStyles}>
          {/* 
          // <div
          //   className={`${styles.ingredient} ${styles.preview}`}
          // >
          //   Preview: {ingredient.height}x{ingredient.width}
          // </div>
         */}
        </IngredientPreview>
      )}
    </>
  );
};

export default BentoIngredient;
