import {
  Coordinates,
  Ingredient,
  IngredientVariant,
  ResizeType,
} from "@/utils/interfaces";

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
 * Compute whether resize action is expanding or shrinking
 * @param squaresMoved    The number of squares moved (positive is expanding, negative is shrinking)
 * @returns               EXPAND or SHRINK
 */
export const computeResizeType = (squaresMoved: number): ResizeType => {
  return squaresMoved > 0 ? ResizeType.EXPAND : ResizeType.SHRINK;
};
