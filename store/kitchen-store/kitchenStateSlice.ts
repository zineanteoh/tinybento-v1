import { KitchenActionState } from "@/utils/interfaces";
import { StateCreator } from "zustand";

export interface KitchenStateSlice {
  currentAction: KitchenActionState | null;
  setCurrentAction: (action: KitchenActionState | null) => void;
}

export const createKitchenStateSlice: StateCreator<
  KitchenStateSlice,
  [],
  [],
  KitchenStateSlice
> = (set, get) => ({
  currentAction: null,
  setCurrentAction: (currentAction) => set(() => ({ currentAction })),
});
