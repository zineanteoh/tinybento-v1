import { StateCreator } from "zustand";
import { BentoDataSlice } from "./bentoDataSlice";
import { Coordinates } from "@/components/Bento";

export enum ResizeDirection {
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export interface ResizeSlice {
  // whether the user is resizing an object
  isResizing: boolean;
  setIsResizing: (isResizing: boolean) => void;

  // the coordinate of the object being resized in relation to the bento. i.e. (0,0), (0,1)
  coordinateOfObject: Coordinates | null;
  setCoodinateOfObject: (coordinate: Coordinates | null) => void;

  // the border of the object being resized. i.e. TOP, BOTTOM, LEFT, RIGHT
  directionOfResize: ResizeDirection | null;
  setDirectionOfResize: (direction: ResizeDirection | null) => void;

  // TODO: step? mouse position?
}

export const createResizeSlice: StateCreator<
  ResizeSlice & BentoDataSlice,
  [],
  [],
  ResizeSlice
> = (set, get) => ({
  isResizing: false,
  setIsResizing: (isResizing: boolean) => {
    set({ isResizing });
  },

  coordinateOfObject: null,
  setCoodinateOfObject: (coordinate: Coordinates | null) => {
    set({ coordinateOfObject: coordinate });
  },

  directionOfResize: null,
  setDirectionOfResize: (direction: ResizeDirection | null) => {
    set({ directionOfResize: direction });
  },
});
