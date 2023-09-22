import { StateCreator } from "zustand";

export type Demo2Slice = {
  isDropped: boolean;
  setIsDropped: (isDropped: boolean) => void;
};

export const createDemo2Slice: StateCreator<Demo2Slice> = (set) => ({
  isDropped: false,
  setIsDropped: (isDropped) => set(() => ({ isDropped })),
});
