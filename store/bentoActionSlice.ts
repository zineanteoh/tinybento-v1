import {
  BentoIngredient2D,
  BentoIngredientType,
  Coordinates,
  Dimension,
  Ingredient,
  IngredientVariant,
} from "@/utils/interfaces";
import { StateCreator } from "zustand";
import { BentoDataSlice } from "./bentoDataSlice";
import { DragSlice } from "./dragSlice";

export type BentoActionSlice = {
  // adding dropped ingredient
  addDroppedIngredient: (droppedCoordinate: Coordinates) => void;

  // adding ingredient while specifying the variant
  addIngredient: (
    droppedCoordinate: Coordinates,
    droppedVariant: IngredientVariant
  ) => void;

  // removing ingredient from the bento
  removeIngredient: (coordinateToRemove: Coordinates) => void;

  // clear dropped ingredients
  clearAllDroppedIngredients: () => void;
  clearVariantIngredients: (variantToClear: IngredientVariant) => void;
};

export const createBentoActionSlice: StateCreator<
  BentoActionSlice & BentoDataSlice & DragSlice,
  [],
  [],
  BentoActionSlice
> = (set, get) => ({
  addDroppedIngredient: (droppedCoordinate) => {
    const { addIngredient } = get();
    addIngredient(droppedCoordinate, IngredientVariant.DROPPED);
  },
  addIngredient: (droppedCoordinate, droppedVariant) => {
    const { dimension, dragging, bentoIngredients, bentoIngredients2D } = get();

    // if no dragging, return
    if (!dragging) return;

    if (
      !canDropIngredient(
        dimension,
        bentoIngredients2D,
        dragging,
        droppedCoordinate
      )
    )
      return;

    // construct the ingredient to add (which can be viewable or preview)
    const bentoIngredientToAdd: BentoIngredientType = {
      width: dragging.width,
      height: dragging.height,
      coordinate: droppedCoordinate,
      variant: droppedVariant,
    };

    set(() => {
      // update bentoIngredients and bentoIngredients2D
      const newBentoIngredients2D = bentoIngredients2D;
      for (let i = 0; i < dragging.height; i++) {
        for (let j = 0; j < dragging.width; j++) {
          newBentoIngredients2D[droppedCoordinate.y + i][
            droppedCoordinate.x + j
          ] = bentoIngredientToAdd;
        }
      }

      return {
        bentoIngredients: [...bentoIngredients, bentoIngredientToAdd],
        bentoIngredients2D: newBentoIngredients2D,
      };
    });
  },
  removeIngredient: (coordinateToRemove) => {
    const { bentoIngredients, bentoIngredients2D } = get();

    // find the ingredient to remove
    const newBentoIngredients2D = bentoIngredients2D;
    const ingredientToRemove = bentoIngredients.find(
      (ingredient) =>
        ingredient.coordinate.x === coordinateToRemove.x &&
        ingredient.coordinate.y === coordinateToRemove.y
    );

    // if no ingredient to remove, return
    if (!ingredientToRemove) return;

    // iterate through the ingredient's squares and remove them from bentoIngredients2D
    for (let i = 0; i < ingredientToRemove.height; i++) {
      for (let j = 0; j < ingredientToRemove.width; j++) {
        newBentoIngredients2D[coordinateToRemove.y + i][
          coordinateToRemove.x + j
        ] = null;
      }
    }

    // remove the ingredient from bentoIngredients
    set(() => ({
      bentoIngredients: bentoIngredients.filter(
        (ingredient) => ingredient !== ingredientToRemove
      ),
      bentoIngredients2D: newBentoIngredients2D,
    }));
  },
  clearAllDroppedIngredients: () => {
    const { clearVariantIngredients } = get();
    clearVariantIngredients(IngredientVariant.DROPPED);
  },
  clearVariantIngredients(variantToClear) {
    const { bentoIngredients, bentoIngredients2D } = get();

    // find all ingredients of variant to clear
    const toClear = bentoIngredients.filter(
      (ingredient) => ingredient.variant === variantToClear
    );

    // nothing to clear
    if (toClear.length === 0) return;

    toClear.forEach((ingredient) => {
      // iterate through the ingredient's squares and remove them from bentoIngredients2D
      for (let i = 0; i < ingredient.height; i++) {
        for (let j = 0; j < ingredient.width; j++) {
          bentoIngredients2D[ingredient.coordinate.y + i][
            ingredient.coordinate.x + j
          ] = null;
        }
      }
    });

    // remove all ingredients of variant to clear
    set(() => ({
      bentoIngredients: bentoIngredients.filter(
        (ingredient) => ingredient.variant !== variantToClear
      ),
      bentoIngredients2D: bentoIngredients2D,
    }));
  },
});

// ----------------------------------------------------------------------
// Helper Functions
// ----------------------------------------------------------------------

/**
 * Check if the ingredient can be dropped at the coordinate
 *
 * 1. Check if the coordinate is already occupied
 * 2. Check if ingredient's squares are within the bento
 * 3. Check if ingredient's squares are not overlapping with other ingredients
 * @param dimension         dimension of the bento
 * @param bentoIngredients  2D array of bento ingredients (dropped and preview)
 * @param dragging          dragging ingredient
 * @param droppedCoordinate coordinate of the dropped ingredient
 * @returns                 true if the ingredient can be dropped at the coordinate
 */
const canDropIngredient = (
  dimension: Dimension,
  bentoIngredients2D: BentoIngredient2D,
  dragging: Ingredient,
  droppedCoordinate: Coordinates
): boolean => {
  const { x, y } = droppedCoordinate;

  // 1. check if the coordinate is already occupied
  if (bentoIngredients2D[y][x] !== null) return false;

  // 2. check if ingredient's squares are within the bento's coordinate
  if (y + dragging.height > dimension.height) return false;
  if (x + dragging.width > dimension.width) return false;

  // 3. check if ingredient's squares are not overlapping with other ingredients
  for (let i = 0; i < dragging.width; i++) {
    for (let j = 0; j < dragging.height; j++) {
      if (bentoIngredients2D[y + j][x + i] !== null) return false;
    }
  }

  // if all checks passed, return true
  return true;
};
