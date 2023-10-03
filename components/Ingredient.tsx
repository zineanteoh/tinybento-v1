import React from "react";
import { CONTAINER_HEIGHT, CONTAINER_WIDTH } from "./Bento";
import {
  IngredientVariant,
  IngredientProps,
  ResizeStartCallbackProps,
  ResizeEndCallbackProps,
} from "@/utils/interfaces";
import styles from "./Ingredient.module.css";
import Resizable from "./Resizable";
import { useStore } from "@/store/store";

// TODO: hardcode padding here for now
const PADDING = 20;

const Ingredient = ({ dimension, ingredient, variant }: IngredientProps) => {
  const {
    setIsResizing,
    setCoordinateOfObject,
    setDirectionOfResize,
    isResizePossible,
    resizeObject,
  } = useStore();

  const widthPerSquare = CONTAINER_WIDTH / dimension.width;
  const heightPerSquare = CONTAINER_HEIGHT / dimension.height;

  // compute the position and size of the ingredient
  const computedStyles = {
    width: ingredient.width * widthPerSquare - 2 * PADDING,
    height: ingredient.height * heightPerSquare - 2 * PADDING,
    top: ingredient.coordinate.y * heightPerSquare + PADDING,
    left: ingredient.coordinate.x * widthPerSquare + PADDING,
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
          childStyleToApply={{
            ...computedStyles,
            backgroundColor: "lightgreen",
          }}
          childWidth={ingredient.width * widthPerSquare - 2 * PADDING}
          childHeight={ingredient.height * heightPerSquare - 2 * PADDING}
          coordinate={ingredient.coordinate}
          squareWidth={widthPerSquare}
          squareHeight={heightPerSquare}
          startTop={ingredient.coordinate.y * heightPerSquare + 2 + PADDING / 2} // TODO: add 2 to account for top/down border
          startLeft={ingredient.coordinate.x * widthPerSquare + 2 + PADDING / 2} // TODO: add 2 to account for left/right border
          onResizeStartCallback={handleResizeStart}
          onResizeEndCallback={handleResizeEnd}
          shouldResizeCallback={isResizePossible}
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
    </>
  );
};

export default Ingredient;
