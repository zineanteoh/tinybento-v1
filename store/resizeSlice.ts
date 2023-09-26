import { StateCreator } from "zustand";
import { BentoDataSlice } from "./bentoDataSlice";

// TODO:
export interface ResizeSlice {
  isResizing: boolean;
}

// TODO:
export const createResizeSlice: StateCreator<
  ResizeSlice & BentoDataSlice,
  [],
  [],
  ResizeSlice
> = (set, get) => ({
  isResizing: false,
});
