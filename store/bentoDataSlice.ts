import { Coordinates, Dimension } from "@/components/Bento";
import { IngredientVariant } from "@/components/Ingredient";
import { StateCreator } from "zustand";
import { DragSlice } from "./dragSlice";

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

export type BentoIngredient2D = (BentoIngredientType | null)[][];

export type BentoDataSlice = {
  // keep track of the dimension of the bento
  dimension: Dimension;
  setDimension: (dimension: Dimension) => void;

  // keep track of the ingredients (both dropped and preview)
  bentoIngredients: BentoIngredientType[];
  bentoIngredients2D: BentoIngredient2D;
};

// TODO: hardcode for now
const DIMENSION: Dimension = {
  width: 4,
  height: 4,
};

export const createBentoDataSlice: StateCreator<
  BentoDataSlice & DragSlice,
  [],
  [],
  BentoDataSlice
> = (set, get) => ({
  dimension: DIMENSION,
  setDimension: (dimension) => set(() => ({ dimension })),

  bentoIngredients: [],
  bentoIngredients2D: genererate2DArrayOfNulls(DIMENSION),
});

// ----------------------------------------------------------------------
// Helper Functions
// ----------------------------------------------------------------------

const genererate2DArrayOfNulls = (dimension: Dimension): null[][] => {
  const { width, height } = dimension;
  return Array.from({ length: height }).map(() =>
    Array.from({ length: width }).map(() => null)
  );
};
