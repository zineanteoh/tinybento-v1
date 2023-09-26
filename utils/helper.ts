import { Coordinates } from "@/components/Bento";
import { IngredientVariant } from "@/components/Ingredient";
import { Ingredient } from "@/store/bentoDataSlice";

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
