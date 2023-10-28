import React, { useState } from "react";
import {
  IngredientVariant,
  IngredientProps,
  Dimension,
  CSSPosition,
} from "@/utils/interfaces";
import styles from "./Ingredient.module.css";

/**
 * An ingredient is a draggable and resizable item that can be placed in a bento.
 *
 * It is styled absolutely, relative to the bento container.
 *
 */
const Ingredient = ({
  ingredient, // ingredient data
  variant, // ingredient variant (dropped or preview)
  bentoDimension, // dimension of the bento container e.g. { width: 4, height: 4}
  bentoWidth, // width of the bento container (in px)
  bentoHeight, // height of the bento container (in px)

  // optional props
  padding = 20, // padding of the ingredient (in px)
}: IngredientProps) => {
  // internally compute the size of each square in the bento
  const widthPerSquare = bentoWidth / bentoDimension.width;
  const heightPerSquare = bentoHeight / bentoDimension.height;

  // compute the size and position of the ingredient
  const computedStyles = {
    width: ingredient.width * widthPerSquare - 2 * padding, // width of ingredient (in px)
    height: ingredient.height * heightPerSquare - 2 * padding, // height of ingredient (in px)
    top: ingredient.coordinate.y * heightPerSquare + padding, // relative to the top border of bento container (in px)
    left: ingredient.coordinate.x * widthPerSquare + padding, // relative to the left border of bento container (in px)
  };

  const [size, setSize] = useState<Dimension>({
    width: computedStyles.width,
    height: computedStyles.height,
  });

  // keep track of the position (in px) of the component relative to the parent
  const [position, setPosition] = useState<CSSPosition>({
    top: ingredient.coordinate.y * heightPerSquare,
    left: ingredient.coordinate.x * widthPerSquare,
  });

  return (
    <>
      {/* Render Dropped */}
      {variant === IngredientVariant.DROPPED && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgreen",
            position: "absolute",
            width: size.width,
            height: size.height,
            top: position.top + padding / 2 + 2, // add 2 to account for top+down border
            left: position.left + padding / 2 + 2, // add 2 to account for left+right border
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
