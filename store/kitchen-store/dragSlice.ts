import { StateCreator } from "zustand";
import { BentoDataSlice } from "./bentoDataSlice";
import {
  Coordinates,
  DraggableIngredient,
  IngredientVariant,
} from "@/utils/interfaces";
import { BentoActionSlice } from "./bentoActionSlice";

export interface DragSlice {
  // keep track of the dragging ingredient
  dragging: DraggableIngredient | null;
  setDragging: (draggingIngredient: DraggableIngredient | null) => void;

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
