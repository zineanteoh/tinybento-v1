import { create } from "zustand";

type Store = {
  isDropped: boolean;
  setIsDropped: (isDropped: boolean) => void;

  droppedIngredients: string[];
  addDroppedIngredient: (droppedIngredient: string) => void;
};

export const useStore = create<Store>()((set) => ({
  isDropped: false,
  setIsDropped: (isDropped) => set({ isDropped }),

  droppedIngredients: [],
  addDroppedIngredient: (droppedIngredient) =>
    set((state) => ({
      droppedIngredients: [...state.droppedIngredients, droppedIngredient],
    })),
}));
