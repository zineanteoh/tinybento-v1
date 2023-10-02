import React from "react";
import {
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
  Coordinates,
  Dimension,
} from "./Bento";
import { BentoIngredientType } from "@/store/bentoDataSlice";
import styles from "./Ingredient.module.css";
import Resizable from "./Resizable";
import { useStore } from "@/store/store";
import { ResizeDirection } from "@/store/resizeSlice";

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
const PADDING = 20;

const Ingredient = ({ dimension, ingredient, variant }: IngredientProps) => {
  const { setIsResizing, setCoodinateOfObject, setDirectionOfResize } =
    useStore();

  const widthPerSquare = CONTAINER_WIDTH / dimension.width;
  const heightPerSquare = CONTAINER_HEIGHT / dimension.height;

  // compute the position and size of the ingredient
  const computedStyles = {
    width: ingredient.width * widthPerSquare - 2 * PADDING,
    height: ingredient.height * heightPerSquare - 2 * PADDING,
    top: ingredient.coordinate.y * heightPerSquare + PADDING,
    left: ingredient.coordinate.x * widthPerSquare + PADDING,
  };

  const handleResizeStart = ({
    coordinateOfObject,
    directionOfResize,
  }: {
    coordinateOfObject: Coordinates;
    directionOfResize: ResizeDirection;
  }) => {
    setIsResizing(true);
    setCoodinateOfObject(coordinateOfObject);
    setDirectionOfResize(directionOfResize);
  };

  const handleResizeEnd = ({ snapSize }: { snapSize: number }) => {
    setIsResizing(false);
    setCoodinateOfObject(null);
    setDirectionOfResize(null);
    // TODO: what if snapsize is not allowed?
    console.log("snap size: ", snapSize);
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
          snapXGap={widthPerSquare}
          snapYGap={heightPerSquare}
          startTop={ingredient.coordinate.y * heightPerSquare + 2 + PADDING / 2} // TODO: add 2 to account for top/down border
          startLeft={ingredient.coordinate.x * widthPerSquare + 2 + PADDING / 2} // TODO: add 2 to account for left/right border
          onResizeStartCallback={handleResizeStart}
          onResizeEndCallback={handleResizeEnd}
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
