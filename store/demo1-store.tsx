import { Coordinates, Dimension } from "@/components/Bento";
import { DroppedVariant } from "@/components/Ingredient";
import { StateCreator } from "zustand";

export interface Ingredient {
  width: number;
  height: number;
  variant: DroppedVariant;
}

/**
 * @property {number} width
 * @property {number} height
 * @property {number} coordinate
 */
export interface DroppedIngredientType extends Ingredient {
  coordinate: Coordinates;
  variant: DroppedVariant.VIEWABLE;
}

/**
 * @property {number} width
 * @property {number} height
 * @property {number} coordinate
 */
export interface PreviewIngredientType extends Ingredient {
  coordinate: Coordinates;
  variant: DroppedVariant.PREVIEW;
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

  // keep track of the dropped ingredients (two ways)
  dropped: BentoIngredientType[];
  dropped2D: BentoIngredient2D;
  addIngredient: (
    droppedCoordinate: Coordinates,
    droppedVariant: DroppedVariant
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

  dropped: [],
  dropped2D: genererate2DArrayOfNulls(DIMENSION),
  addIngredient: (droppedCoordinate, droppedVariant) => {
    console.log("ADDING INGREDIENT");

    const { dimension, dragging, dropped, dropped2D } = get();

    // if no dragging, return
    if (!dragging) return;

    if (!canDropIngredient(dimension, dropped2D, dragging, droppedCoordinate))
      return;

    // construct the ingredient to add (which can be viewable or preview)
    const bentoIngredientToAdd: BentoIngredientType = {
      width: dragging.width,
      height: dragging.height,
      coordinate: droppedCoordinate,
      variant: droppedVariant,
    };

    set(() => {
      // update dropped and dropped2D
      const newDropped2D = dropped2D;
      for (let i = 0; i < dragging.height; i++) {
        for (let j = 0; j < dragging.width; j++) {
          newDropped2D[droppedCoordinate.y + i][droppedCoordinate.x + j] =
            bentoIngredientToAdd;
        }
      }

      return {
        dropped: [...dropped, bentoIngredientToAdd],
        dropped2D: newDropped2D,
      };
    });
  },
  removeIngredient: (coordinateToRemove) => {
    console.log("REMOVING INGREDIENT");
    const { dropped, dropped2D } = get();

    // find the ingredient to remove
    const newDropped2D = dropped2D;
    const ingredientToRemove = dropped.find(
      (ingredient) =>
        ingredient.coordinate.x === coordinateToRemove.x &&
        ingredient.coordinate.y === coordinateToRemove.y
    );

    // if no ingredient to remove, return
    if (!ingredientToRemove) return;

    // iterate through the ingredient's squares and remove them from dropped2D
    for (let i = 0; i < ingredientToRemove.height; i++) {
      for (let j = 0; j < ingredientToRemove.width; j++) {
        newDropped2D[coordinateToRemove.y + i][coordinateToRemove.x + j] = null;
      }
    }

    set(() => ({
      dropped: dropped.filter(
        (ingredient) => ingredient !== ingredientToRemove
      ),
      dropped2D: newDropped2D,
    }));
  },
  clearPreview: () => {
    const { dropped, dropped2D } = get();

    // find all preview ingredients to clear
    const toClear = dropped.filter(
      (ingredient) => ingredient.variant === DroppedVariant.PREVIEW
    );

    // nothing to clear
    if (toClear.length === 0) return;

    toClear.forEach((ingredient) => {
      // iterate through the ingredient's squares and remove them from dropped2D
      for (let i = 0; i < ingredient.height; i++) {
        for (let j = 0; j < ingredient.width; j++) {
          dropped2D[ingredient.coordinate.y + i][ingredient.coordinate.x + j] =
            null;
        }
      }
    });

    set(() => ({
      dropped: dropped.filter(
        (ingredient) => ingredient.variant !== DroppedVariant.PREVIEW
      ),
      dropped2D,
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
 * @param dropped2D         2D array of bento ingredients (dropped and preview)
 * @param dragging          dragging ingredient
 * @param droppedCoordinate coordinate of the dropped ingredient
 * @returns                 true if the ingredient can be dropped at the coordinate
 */
const canDropIngredient = (
  dimension: Dimension,
  dropped2D: BentoIngredient2D,
  dragging: Ingredient,
  droppedCoordinate: Coordinates
): boolean => {
  const { x, y } = droppedCoordinate;

  // 1. check if the coordinate is already occupied
  if (dropped2D[y][x] !== null) return false;

  // 2. check if ingredient's squares are within the bento's coordinate
  console.log(x, dragging.width, dragging.height, dimension.width);
  if (y + dragging.height > dimension.height) return false;
  if (x + dragging.width > dimension.width) return false;

  // 3. check if ingredient's squares are not overlapping with other ingredients
  for (let i = 0; i < dragging.width; i++) {
    for (let j = 0; j < dragging.height; j++) {
      if (dropped2D[y + j][x + i] !== null) return false;
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
