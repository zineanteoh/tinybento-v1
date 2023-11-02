import { create } from "zustand";
import { BentoDataSlice, createBentoDataSlice } from "./bentoDataSlice";
import { ResizeSlice, createResizeSlice } from "./resizeSlice";
import { DragSlice, createDragSlice } from "./dragSlice";
import { BentoActionSlice, createBentoActionSlice } from "./bentoActionSlice";
import {
  KitchenStateSlice,
  createKitchenStateSlice,
} from "./kitchenStateSlice";
import {
  BentoResponsiveSlice,
  createBentoResponsiveSlice,
} from "./bentoResponsiveSlice";

// the implementation of our store
// https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md#updating-multiple-stores
export const useStore = create<
  BentoDataSlice &
    BentoActionSlice &
    BentoResponsiveSlice &
    DragSlice &
    ResizeSlice &
    KitchenStateSlice
>()((...a) => ({
  // slice for bento's internal state (dimension, ingredients, ingredients2D, etc.)
  ...createBentoDataSlice(...a),

  // slice for bento's actions (add/remove/clear ingredients)
  ...createBentoActionSlice(...a),

  // slice for enabling bento to be responsive
  ...createBentoResponsiveSlice(...a),

  // slice to enable dragging
  ...createDragSlice(...a),

  // slice to enable resizing
  ...createResizeSlice(...a),

  // slice for the kitchen's state
  ...createKitchenStateSlice(...a),
}));
