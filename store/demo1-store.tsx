import { Coordinates } from "@/components/demo-1/Bento";
import { StateCreator } from "zustand";

export type Demo1Slice = {
  dragging: string | null;
  setDragging: (draggingIngredient: string | null) => void;

  // keep track of the dropped ingredients
  dropped: string[];
  addDropped: (
    droppedIngredient: string,
    dropCoordinates?: Coordinates
  ) => void;
};

export const createDemo1Slice: StateCreator<Demo1Slice> = (set) => ({
  dragging: null,
  setDragging: (draggingIngredient) =>
    set(() => ({ dragging: draggingIngredient })),

  dropped: [],
  addDropped: (droppedIngredient, dropCoordinates) =>
    set((state: Demo1Slice) => ({
      dropped: [...state.dropped, droppedIngredient],
    })),
});
