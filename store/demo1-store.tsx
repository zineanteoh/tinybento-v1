import { Coordinates } from "@/components/demo-1/Bento";
import { StateCreator } from "zustand";

interface DroppedIngredient {
  id: string;
  coordinate: Coordinates;
}

export type Demo1Slice = {
  // keep track of the dragging ingredient
  dragging: string | null;
  setDragging: (draggingIngredient: string | null) => void;

  // keep track of the dropped ingredients
  dropped: DroppedIngredient[];
  addDropped: (newDropped: string, coordinate: Coordinates) => void;
};

export const createDemo1Slice: StateCreator<Demo1Slice> = (set) => ({
  dragging: null,
  setDragging: (dragging) => set(() => ({ dragging })),

  dropped: [],
  addDropped: (newDropped, coordinate) => {
    // TODO: check if coordinate is already occupied

    set((state) => ({
      dropped: [
        ...state.dropped,
        {
          id: newDropped,
          coordinate: coordinate,
        },
      ],
    }));
  },
});
