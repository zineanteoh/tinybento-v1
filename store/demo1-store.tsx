import { Coordinates, Dimension } from "@/components/Bento";
import { IngredientVariant } from "@/components/Ingredient";
import { StateCreator } from "zustand";

export interface Ingredient {
  width: number;
  height: number;
  variant: IngredientVariant;
}

/**
 * @property {number} width
 * @property {number} height
 * @property {number} coordinate
 */
export interface DroppedIngredientType extends Ingredient {
  coordinate: Coordinates;
  variant: IngredientVariant.DROPPED;
}

/**
 * @property {number} width
 * @property {number} height
 * @property {number} coordinate
 */
export interface PreviewIngredientType extends Ingredient {
  coordinate: Coordinates;
  variant: IngredientVariant.PREVIEW;
}

/**
 * Joint type of DroppedIngredientType and PreviewIngredientType
 */
export type BentoIngredientType = DroppedIngredientType | PreviewIngredientType;

type BentoIngredient2D = (BentoIngredientType | null)[][];

export type Demo1Slice = {
  // keep track of the dimension of the bento
  dimension: Dimension;
  setDimension: (dimension: Dimension) => void;

  // keep track of the dragging ingredient
  dragging: Ingredient | null;
  setDragging: (draggingIngredient: Ingredient | null) => void;

  // keep track of the ingredients (both dropped and preview)
  bentoIngredients: BentoIngredientType[];
  bentoIngredients2D: BentoIngredient2D;
  addPreviewIngredient: (droppedCoordinate: Coordinates) => void;
  addDroppedIngredient: (droppedCoordinate: Coordinates) => void;
  addIngredient: (
    droppedCoordinate: Coordinates,
    droppedVariant: IngredientVariant
  ) => void;
  removeIngredient: (coordinateToRemove: Coordinates) => void;
  clearPreview: () => void;
};

// TODO: hardcode for now
const DIMENSION: Dimension = {
  width: 4,
  height: 4,
};

export const createDemo1Slice: StateCreator<Demo1Slice> = (set, get) => ({
  dimension: DIMENSION,
  setDimension: (dimension) => set(() => ({ dimension })),

  dragging: null,
  setDragging: (dragging) => set(() => ({ dragging })),

  bentoIngredients: [],
  bentoIngredients2D: genererate2DArrayOfNulls(DIMENSION),
  addPreviewIngredient: (droppedCoordinate) => {
    const { addIngredient } = get();
    addIngredient(droppedCoordinate, IngredientVariant.PREVIEW);
  },
  addDroppedIngredient: (droppedCoordinate) => {
    const { addIngredient } = get();
    addIngredient(droppedCoordinate, IngredientVariant.DROPPED);
  },
  addIngredient: (droppedCoordinate, droppedVariant) => {
    console.log("ADDING INGREDIENT", droppedVariant);

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
    console.log("REMOVING INGREDIENT AT", coordinateToRemove, "...");
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

    set(() => ({
      bentoIngredients: bentoIngredients.filter(
        (ingredient) => ingredient !== ingredientToRemove
      ),
      bentoIngredients2D: newBentoIngredients2D,
    }));
  },
  clearPreview: () => {
    const { bentoIngredients, bentoIngredients2D } = get();

    // find all preview ingredients to clear
    const toClear = bentoIngredients.filter(
      (ingredient) => ingredient.variant === IngredientVariant.PREVIEW
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

    set(() => ({
      bentoIngredients: bentoIngredients.filter(
        (ingredient) => ingredient.variant !== IngredientVariant.PREVIEW
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

const genererate2DArrayOfNulls = (dimension: Dimension): null[][] => {
  const { width, height } = dimension;
  return Array.from({ length: height }).map(() =>
    Array.from({ length: width }).map(() => null)
  );
};
