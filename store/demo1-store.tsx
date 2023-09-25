import { Coordinates, Dimension } from "@/components/demo-1/Bento";
import { StateCreator } from "zustand";

export interface Ingredient {
  width: number;
  height: number;
}

export interface DroppedIngredient extends Ingredient {
  coordinate: Coordinates;
}

type DroppedIngredient2D = (DroppedIngredient | null)[][];

export type Demo1Slice = {
  // keep track of the dimension of the bento
  dimension: Dimension;
  setDimension: (dimension: Dimension) => void;

  // keep track of the dragging ingredient
  dragging: Ingredient | null;
  setDragging: (draggingIngredient: Ingredient | null) => void;

  // keep track of the dropped ingredients (two ways)
  dropped: DroppedIngredient[];
  dropped2D: DroppedIngredient2D;
  handleDropped: (droppedCoordinate: Coordinates) => void;
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
  handleDropped: (droppedCoordinate) => {
    const { dimension, dragging, dropped, dropped2D } = get();

    // if no dragging, return
    if (!dragging) return;

    // if cannot drop, return
    if (!canDropIngredient(dimension, dropped2D, dragging, droppedCoordinate))
      return;

    set(() => {
      // update dropped
      const newDroped: DroppedIngredient = {
        width: dragging.width,
        height: dragging.height,
        coordinate: droppedCoordinate,
      };
      // update dropped2D
      const newDropped2D = dropped2D;
      for (let i = 0; i < dragging.height; i++) {
        for (let j = 0; j < dragging.width; j++) {
          newDropped2D[droppedCoordinate.y + i][droppedCoordinate.x + j] =
            newDroped;
        }
      }

      return {
        dropped: [...dropped, newDroped],
        dropped2D: newDropped2D,
      };
    });
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
 * @param dropped2D         2D array of dropped ingredients
 * @param dragging          dragging ingredient
 * @param droppedCoordinate coordinate of the dropped ingredient
 * @returns                 true if the ingredient can be dropped at the coordinate
 */
const canDropIngredient = (
  dimension: Dimension,
  dropped2D: DroppedIngredient2D,
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
