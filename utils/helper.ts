import {
  CSSPosition,
  Coordinates,
  Dimension,
  DirectionMultiplier,
  Ingredient,
  IngredientVariant,
  ResizeDirection,
  ResizeType,
} from "@/utils/interfaces";
import { start } from "repl";

// ============================================================================
// General Helper Functions
// ============================================================================

/**
 * Converts "x,y" string to Coordinates object
 * @param str string in format "x,y"
 * @returns   Coordinates object
 */
export const convertStringToCoordinate = (str: string): Coordinates => {
  const [x, y] = str.split(",").map((item) => parseInt(item));
  return { x, y };
};

/**
 * Converts "AxB" string to Ingredient object
 * @param str string in format "AxB"
 * @returns   Ingredient object
 */
export const convertStringToIngredient = (str: string): Ingredient => {
  const [height, width] = str.split("x").map((item) => parseInt(item));
  return { width, height, variant: IngredientVariant.DROPPED };
};

/**
 * Returns a if condition is true, b if condition is false
 */
export const ternary = <T>(condition: boolean, a: T, b: T) => {
  return condition ? a : b;
};

// ============================================================================
// Resize Helper Functions
// ============================================================================

/**
 * Compute whether resize action is horizontal or vertical
 */
export const isHorizontal = (d: ResizeDirection) => {
  return d === ResizeDirection.LEFT || d === ResizeDirection.RIGHT;
};

/**
 * Compute whether resize action is expanding or shrinking
 * @param squaresMoved    The number of squares moved (positive is expanding, negative is shrinking)
 * @returns               EXPAND or SHRINK
 */
export const computeResizeType = (squaresMoved: number): ResizeType => {
  return squaresMoved > 0 ? ResizeType.EXPAND : ResizeType.SHRINK;
};

/**
 * Compute the new {width, height} for when ingredient is expanded through resize
 * @param d           The direction of resize
 * @param startSize   The starting {width, height} of the ingredient
 * @param newSize     The new size of the ingredient
 * @returns           The new {width, height} of the ingredient
 */
export const computeNewSizeForExpand = (
  d: ResizeDirection,
  startSize: Dimension,
  newSize: number
): Dimension => {
  switch (d) {
    // width should expand if resizing left or right
    case ResizeDirection.LEFT:
    case ResizeDirection.RIGHT:
      return {
        ...startSize,
        width: newSize,
      };
    // height should expand if resizing top or bottom
    case ResizeDirection.TOP:
    case ResizeDirection.BOTTOM:
      return {
        ...startSize,
        height: newSize,
      };
  }
};

/**
 * Compute the new {width, height} for when ingredient is shrunk through resize
 * @param d                 The direction of resize
 * @param startSize         The starting {width, height} of the ingredient
 * @param newSize           The new size of the ingredient (either width or height, depending what is passed on)
 * @param minimizedSquare   The size of the ingredient when it is minimized
 * @param squareLength      The length of a square (either width or height, depending what is passed on)
 * @returns                 The new {width, height} of the ingredient
 */
export const computeNewSizeForShrink = (
  d: ResizeDirection,
  startSize: Dimension,
  newSize: number,
  minimizedSquare: Dimension,
  squareLength: number
): Dimension => {
  // if horizontal, we want to shrink width
  const dim = isHorizontal(d) ? "width" : "height";
  // big brain math
  const value = Math.max(
    newSize,
    Math.ceil(minimizedSquare[dim] / squareLength) * minimizedSquare[dim]
  );

  return {
    ...startSize,
    // set the field we are shrinking to the new value
    [dim]: value,
  };
};

/**
 * Compute the new position for when ingredient is expanded through resize
 * @param d               The direction of resize
 * @param startPosition   The starting {left, top} of the ingredient
 * @param newPosition     The new position of the ingredient
 * @returns               The new {left, top} of the ingredient
 */
export const computeNewPositionForExpand = (
  d: ResizeDirection,
  startPosition: CSSPosition,
  newPosition: number
): CSSPosition => {
  switch (d) {
    // left should be updated if resizing left
    case ResizeDirection.LEFT:
      return {
        ...startPosition,
        left: newPosition,
      };
    // top should be updated if resizing top
    case ResizeDirection.TOP:
      return {
        ...startPosition,
        top: newPosition,
      };
    // positions don't matter for right + bottom. so can return anything
    case ResizeDirection.RIGHT:
    case ResizeDirection.BOTTOM:
      return startPosition;
  }
};

/**
 * Compute the new position for when ingredient is shrunk through resize
 * @param d                 The direction of resize
 * @param startPosition     The starting {left, top} of the ingredient
 * @param newPosition       The new position of the ingredient
 * @param startSize         The starting {width, height} of the ingredient
 * @param minimizedSquare   The size of the ingredient when it is minimized
 * @returns
 */
export const computeNewPositionForShrink = (
  d: ResizeDirection,
  startPosition: CSSPosition,
  newPosition: number,
  startSize: Dimension,
  minimizedSquare: Dimension
): CSSPosition => {
  const dim = isHorizontal(d) ? "width" : "height";
  const pos = isHorizontal(d) ? "left" : "top";
  const value = Math.min(
    newPosition,
    startPosition[pos] + startSize[dim] - minimizedSquare[dim]
  );

  switch (d) {
    // left/top CSS should be updated if resizing left/top
    case ResizeDirection.LEFT:
    case ResizeDirection.TOP:
      return {
        ...startPosition,
        // set the field we are shrinking to the new value
        [pos]: value,
      };
    // positions don't matter for right + bottom. so return anything
    case ResizeDirection.RIGHT:
    case ResizeDirection.BOTTOM:
      return startPosition;
  }
};

/**
 * Compute the number of squares moved for when ingredient is shrunk through resize
 * @param squaresMoved      The number of squares moved (positive is expanding, negative is shrinking)
 * @param minimizedSquare   The size of the ingredient when it is minimized
 * @param squareLength      The length of a square (either width or height, depending what is passed on)
 * @param direction         The direction of resize
 * @returns                 The number of squares moved
 */
export const computeValidSquaresForShrink = (
  squaresMoved: number,
  minimizedSquare: Dimension,
  squareLength: number,
  direction: ResizeDirection
): number => {
  const dim = isHorizontal(direction) ? "width" : "height";

  return Math.min(
    squaresMoved,
    Math.ceil(minimizedSquare[dim] / squareLength) *
      DirectionMultiplier[direction]
  );
};
