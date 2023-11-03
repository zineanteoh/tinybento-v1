import {
  BentoIngredientsGrid,
  BentoIngredientType,
  Coordinates,
  Dimension,
  DraggableIngredient,
  IngredientVariant,
} from "@/utils/interfaces";
import { StateCreator } from "zustand";
import { BentoDataSlice } from "./bentoDataSlice";
import { DragSlice } from "./dragSlice";

export interface BentoActionSlice {
  // adding dropped ingredient
  addDroppedIngredient: (droppedCoordinate: Coordinates) => void;

  // adding ingredient while specifying the variant
  addIngredient: (
    droppedCoordinate: Coordinates,
    droppedVariant: IngredientVariant
  ) => void;

  // removing ingredient from the bento
  removeIngredient: (coordinateToRemove: Coordinates) => void;

  // moving ingredient to another coordinate
  moveIngredient: (coordinateToMoveTo: Coordinates) => void;

  // clear dropped ingredients
  clearAllDroppedIngredients: () => void;
  clearVariantIngredients: (variantToClear: IngredientVariant) => void;
}

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
    const { dimension, dragging, bentoIngredients, bentoIngredientsGrid } =
      get();

    // if no dragging, return
    if (!dragging) return;

    if (
      !canDropIngredient(
        dimension,
        bentoIngredientsGrid,
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
      // update bentoIngredients and bentoIngredientsGrid
      const newbentoIngredientsGrid = bentoIngredientsGrid;
      for (let i = 0; i < dragging.height; i++) {
        for (let j = 0; j < dragging.width; j++) {
          newbentoIngredientsGrid[droppedCoordinate.y + i][
            droppedCoordinate.x + j
          ] = bentoIngredientToAdd;
        }
      }

      return {
        bentoIngredients: [...bentoIngredients, bentoIngredientToAdd],
        bentoIngredientsGrid: newbentoIngredientsGrid,
      };
    });
  },
  removeIngredient: (coordinateToRemove) => {
    const { bentoIngredients, bentoIngredientsGrid } = get();

    // find the ingredient to remove
    const newbentoIngredientsGrid = bentoIngredientsGrid;
    const ingredientToRemove = bentoIngredients.find(
      (ingredient) =>
        ingredient.coordinate.x === coordinateToRemove.x &&
        ingredient.coordinate.y === coordinateToRemove.y
    );

    // if no ingredient to remove, return
    if (!ingredientToRemove) return;

    // iterate through the ingredient's squares and remove them from bentoIngredientsGrid
    for (let i = 0; i < ingredientToRemove.height; i++) {
      for (let j = 0; j < ingredientToRemove.width; j++) {
        newbentoIngredientsGrid[coordinateToRemove.y + i][
          coordinateToRemove.x + j
        ] = null;
      }
    }

    // remove the ingredient from bentoIngredients
    set(() => ({
      bentoIngredients: bentoIngredients.filter(
        (ingredient) => ingredient !== ingredientToRemove
      ),
      bentoIngredientsGrid: newbentoIngredientsGrid,
    }));
  },
  moveIngredient(coordinateToMoveTo) {
    const {
      dragging,
      bentoIngredients,
      bentoIngredientsGrid,
      removeIngredient,
      addIngredient,
    } = get();

    // if no dragging, return
    if (!dragging) return;

    // find the ingredient to move
    const ingredientToMove = bentoIngredients.find(
      (ingredient) =>
        ingredient.coordinate.x === dragging.coordinate?.x &&
        ingredient.coordinate.y === dragging.coordinate?.y
    );

    // if no ingredient to move, return
    if (!ingredientToMove) return;

    // remove the ingredient from bentoIngredients
    removeIngredient(dragging.coordinate!);

    // if the ingredient cannot be dropped at the coordinateToMoveTo, return
    if (
      !canDropIngredient(
        get().dimension,
        bentoIngredientsGrid,
        dragging,
        coordinateToMoveTo
      )
    ) {
      // add the ingredient back to original coordinate
      addIngredient(dragging.coordinate!, ingredientToMove.variant);
      return;
    }

    // add the ingredient to new coordinate
    addIngredient(coordinateToMoveTo, ingredientToMove.variant);
  },
  clearAllDroppedIngredients: () => {
    const { clearVariantIngredients } = get();
    clearVariantIngredients(IngredientVariant.DROPPED);
  },
  clearVariantIngredients(variantToClear) {
    const { bentoIngredients, bentoIngredientsGrid } = get();

    // find all ingredients of variant to clear
    const toClear = bentoIngredients.filter(
      (ingredient) => ingredient.variant === variantToClear
    );

    // nothing to clear
    if (toClear.length === 0) return;

    toClear.forEach((ingredient) => {
      // iterate through the ingredient's squares and remove them from bentoIngredientsGrid
      for (let i = 0; i < ingredient.height; i++) {
        for (let j = 0; j < ingredient.width; j++) {
          bentoIngredientsGrid[ingredient.coordinate.y + i][
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
      bentoIngredientsGrid,
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
  bentoIngredientsGrid: BentoIngredientsGrid,
  dragging: DraggableIngredient,
  droppedCoordinate: Coordinates
): boolean => {
  const { x, y } = droppedCoordinate;

  // 1. check if the coordinate is already occupied
  if (bentoIngredientsGrid[y][x] !== null) return false;

  // 2. check if ingredient's squares are within the bento's coordinate
  if (y + dragging.height > dimension.height) return false;
  if (x + dragging.width > dimension.width) return false;

  // 3. check if ingredient's squares are not overlapping with other ingredients
  for (let i = 0; i < dragging.width; i++) {
    for (let j = 0; j < dragging.height; j++) {
      if (bentoIngredientsGrid[y + j][x + i] !== null) return false;
    }
  }

  // if all checks passed, return true
  return true;
};
