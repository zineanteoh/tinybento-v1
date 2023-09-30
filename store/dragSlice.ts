import { StateCreator } from "zustand";
import { BentoDataSlice, Ingredient } from "./bentoDataSlice";
import { Coordinates } from "@/components/Bento";
import { IngredientVariant } from "@/components/Ingredient";
import { BentoActionSlice } from "./bentoActionSlice";

export interface DragSlice {
  // keep track of the dragging ingredient
  dragging: Ingredient | null;
  setDragging: (draggingIngredient: Ingredient | null) => void;

  // adding preivew ingredient
  addPreviewIngredient: (droppedCoordinate: Coordinates) => void;

  // clear all preview ingredients
  clearAllPreviewIngredients: () => void;
}

export const createDragSlice: StateCreator<
  DragSlice & BentoDataSlice & BentoActionSlice,
  [],
  [],
  DragSlice
> = (set, get) => ({
  dragging: null,
  setDragging: (dragging) => set(() => ({ dragging })),

  addPreviewIngredient: (droppedCoordinate) => {
    const { addIngredient } = get();
    addIngredient(droppedCoordinate, IngredientVariant.PREVIEW);
  },

  clearAllPreviewIngredients: () => {
    const { clearVariantIngredients } = get();
    clearVariantIngredients(IngredientVariant.PREVIEW);
  },
});
