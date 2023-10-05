import React from "react";
import {
  IngredientVariant,
  IngredientProps,
  ResizeStartCallbackProps,
  ResizeEndCallbackProps,
} from "@/utils/interfaces";
import styles from "./Ingredient.module.css";
import Resizable from "./Resizable";
import { useStore } from "@/store/store";

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
  const {
    setIsResizing,
    setCoordinateOfObject,
    setDirectionOfResize,
    isResizePossible,
    resizeObject,
  } = useStore();

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

  // modify stores when resizing starts
  const handleResizeStart = ({
    coordinateOfObject,
    directionOfResize,
  }: ResizeStartCallbackProps) => {
    setIsResizing(true);
    setCoordinateOfObject(coordinateOfObject);
    setDirectionOfResize(directionOfResize);
  };

  // modify stores when resizing ends
  const handleResizeEnd = ({ squaresMoved }: ResizeEndCallbackProps) => {
    // resize object
    resizeObject({ squaresMoved });

    // reset stores
    setIsResizing(false);
    setCoordinateOfObject(null);
    setDirectionOfResize(null);
  };

  return (
    <>
      {/* Render Dropped */}
      {variant === IngredientVariant.DROPPED && (
        <Resizable
          childWidth={computedStyles.width}
          childHeight={computedStyles.height}
          coordinate={ingredient.coordinate}
          squareWidth={widthPerSquare}
          squareHeight={heightPerSquare}
          onResizeStartCallback={handleResizeStart}
          onResizeEndCallback={handleResizeEnd}
          shouldResizeCallback={isResizePossible}
        >
          {/* TODO: place ingredient component in here */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "lightgreen",
              height: "100%",
            }}
          >
            {ingredient.height}x{ingredient.width}
          </div>
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
    </>
  );
};

export default Ingredient;
