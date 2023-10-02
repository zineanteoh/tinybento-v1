import { StateCreator } from "zustand";
import { BentoDataSlice } from "./bentoDataSlice";
import { Coordinates } from "@/components/Bento";
import { ShouldResizeCallbackProps } from "@/components/Resizable";
import { BentoActionSlice } from "./bentoActionSlice";

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
  setCoordinateOfObject: (coordinate: Coordinates | null) => void;

  // the border of the object being resized. i.e. TOP, BOTTOM, LEFT, RIGHT
  directionOfResize: ResizeDirection | null;
  setDirectionOfResize: (direction: ResizeDirection | null) => void;

  // determines whether the resize is possible using coordinates, direction, and snapSize
  isResizePossible: (props: ShouldResizeCallbackProps) => boolean;

  // resize the object (assumes isResizePossible is true)
  resizeObject: (props: ShouldResizeCallbackProps) => void;
}

export const createResizeSlice: StateCreator<
  ResizeSlice & BentoDataSlice & BentoActionSlice,
  [],
  [],
  ResizeSlice
> = (set, get) => ({
  isResizing: false,
  setIsResizing: (isResizing: boolean) => {
    set({ isResizing });
  },

  coordinateOfObject: null,
  setCoordinateOfObject: (coordinate: Coordinates | null) => {
    set({ coordinateOfObject: coordinate });
  },

  directionOfResize: null,
  setDirectionOfResize: (direction: ResizeDirection | null) => {
    set({ directionOfResize: direction });
  },

  isResizePossible: ({ snapSize }: ShouldResizeCallbackProps) => {
    // snapSize must be positive in the direction of resize
    if (snapSize < 0) return false;

    const { coordinateOfObject, directionOfResize, bentoIngredients2D } = get();

    // 1. check if coordinateOfObject, directionOfResize, or snapSize are not null
    if (!coordinateOfObject || !directionOfResize || !snapSize) return false;

    const { x, y } = coordinateOfObject;
    const ingredientBeingResized = bentoIngredients2D[y][x]!;
    const { width, height } = ingredientBeingResized;

    console.log("isResizePossible being called!!", directionOfResize);

    // 2. for each direction, check if cell is within bounds + unoccupied
    switch (directionOfResize) {
      case ResizeDirection.TOP:
        // return if within bounds
        if (y - snapSize < 0) {
          console.log("FALSE - Not within bounds");
          return false;
        }

        // checks if all cells are unoccupied (depends on width of object)
        for (let currWidth = 0; currWidth < width; currWidth++) {
          for (let currSnap = 1; currSnap <= snapSize; currSnap++) {
            if (bentoIngredients2D[y - currSnap][x + currWidth] !== null) {
              console.log(
                `FALSE - Cell ${x + currWidth}, ${y - currSnap} is occupied`
              );
              return false;
            } else {
              console.log(
                `Cell ${x + currWidth}, ${y - currSnap} is unoccupied`
              );
            }
          }
        }

        return true;
      case ResizeDirection.BOTTOM:
        // return if within bounds
        if (y + snapSize + height > bentoIngredients2D.length) {
          console.log("FALSE - Not within bounds");
          return false;
        }

        // checks if all cells are unoccupied (depends on width of object)
        for (let currWidth = 0; currWidth < width; currWidth++) {
          for (let currSnap = 1; currSnap <= snapSize; currSnap++) {
            if (bentoIngredients2D[y + currSnap][x + currWidth] !== null) {
              console.log(
                `FALSE - Cell ${x + currWidth}, ${y + currSnap} is occupied`
              );
              return false;
            } else {
              console.log(
                `Cell ${x + currWidth}, ${y + currSnap} is unoccupied`
              );
            }
          }
        }

        return true;
      case ResizeDirection.LEFT:
        // return if within bounds
        if (x - snapSize < 0) {
          console.log("FALSE - Not within bounds");
          return false;
        }

        // checks if all cells are unoccupied (depends on height of object)
        for (let currHeight = 0; currHeight < height; currHeight++) {
          for (let currSnap = 1; currSnap <= snapSize; currSnap++) {
            if (bentoIngredients2D[y + currHeight][x - currSnap] !== null) {
              console.log(
                `FALSE - Cell ${x - currSnap}, ${y + currHeight} is occupied`
              );
              return false;
            } else {
              console.log(
                `Cell ${x - currSnap}, ${y + currHeight} is unoccupied`
              );
            }
          }
        }

        return true;
      case ResizeDirection.RIGHT:
        // return if within bounds
        console.log("RIGHT");
        console.log(x, snapSize, width, bentoIngredients2D[y].length);
        if (x + snapSize + width > bentoIngredients2D[y].length) {
          console.log("FALSE - Not within bounds");
          return false;
        }

        // checks if all cells are unoccupied (depends on height of object)
        for (let currHeight = 0; currHeight < height; currHeight++) {
          for (let currSnap = 1; currSnap <= snapSize; currSnap++) {
            if (bentoIngredients2D[y + currHeight][x + currSnap] !== null) {
              console.log(
                `FALSE - Cell ${x + currSnap}, ${y + currHeight} is occupied`
              );
              return false;
            } else {
              console.log(
                `Cell ${x + currSnap}, ${y + currHeight} is unoccupied`
              );
            }
          }
        }

        return true;
      default:
        // should never reach here
        return false;
    }
  },

  resizeObject: ({ snapSize }: ShouldResizeCallbackProps) => {
    // TODO:
  },
});
