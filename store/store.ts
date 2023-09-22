import { create } from "zustand";
import { Demo1Slice, createDemo1Slice } from "./demo1-store";
import { Demo2Slice, createDemo2Slice } from "./demo2-store";

// the implementation of our store
// https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md#updating-multiple-stores
export const useStore = create<Demo1Slice & Demo2Slice>()((...a) => ({
  ...createDemo1Slice(...a),
  ...createDemo2Slice(...a),
}));
