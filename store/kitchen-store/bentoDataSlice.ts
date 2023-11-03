import {
  BentoIngredientsGrid,
  BentoIngredientType,
  Dimension,
} from "@/utils/interfaces";
import { StateCreator } from "zustand";
import { DragSlice } from "./dragSlice";

export interface BentoDataSlice {
  // keep track of the dimension of the bento
  dimension: Dimension;
  setDimension: (dimension: Dimension) => void;

  // keep track of the ingredients (both dropped and preview)
  bentoIngredients: BentoIngredientType[];
  bentoIngredientsGrid: BentoIngredientsGrid;
}

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
  bentoIngredientsGrid: genererate2DArrayOfNulls(DIMENSION),
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
