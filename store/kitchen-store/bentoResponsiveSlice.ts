import { Dimension } from "@/utils/interfaces";
import { StateCreator } from "zustand";

export interface BentoResponsiveSlice {
  bentoDimension: Dimension;

  setBentoDimension: (bentoDimension: Dimension) => void;
}

export const createBentoResponsiveSlice: StateCreator<
  BentoResponsiveSlice,
  [],
  [],
  BentoResponsiveSlice
> = (set, get) => ({
  bentoDimension: { width: 0, height: 0 },
  setBentoDimension: (bentoDimension) => set(() => ({ bentoDimension })),
});
