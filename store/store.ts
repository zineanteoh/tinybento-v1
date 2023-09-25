import { create } from "zustand";
import { Demo1Slice, createDemo1Slice } from "./demo1-store";

// the implementation of our store
// https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md#updating-multiple-stores
export const useStore = create<Demo1Slice>()((...a) => ({
  ...createDemo1Slice(...a),
}));
