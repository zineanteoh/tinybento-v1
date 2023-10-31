import { StateCreator } from "zustand";
import { BentoDataSlice } from "./bentoDataSlice";
import { BentoActionSlice } from "./bentoActionSlice";
import {
  BentoIngredientsGrid,
  BentoIngredientType,
  Coordinates,
  ResizeDirection,
  ResizeType,
  ShouldResizeCallbackProps,
} from "@/utils/interfaces";
import { computeResizeType } from "@/utils/helper";

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

  // determines whether the resize is possible using coordinates, direction, and sizeOfResize
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

  isResizePossible: ({ squaresMoved }: ShouldResizeCallbackProps) => {
    console.log(`[isResizePossible] squaresMoved: ${squaresMoved}`);
    // TODO: ??? squaresMoved must be positive in the direction of resize
    if (squaresMoved < 0) return false;

    const {
      coordinateOfObject,
      directionOfResize,
      bentoIngredientsGrid: ingredients2d,
    } = get();

    // 1. check if coordinateOfObject, directionOfResize, or sizeOfResize are not null
    if (!coordinateOfObject || !directionOfResize || !squaresMoved)
      return false;

    const { x, y } = coordinateOfObject;
    const ingredientBeingResized = ingredients2d[y][x]!;
    const { width, height } = ingredientBeingResized;

    // 2. for each direction, check if cell is within bounds + unoccupied
    switch (directionOfResize) {
      case ResizeDirection.TOP:
        // return if within bounds
        if (y - squaresMoved < 0) {
          console.log("[IsResizePossible] FALSE - Not within bounds");
          return false;
        }

        // checks if all cells are unoccupied (depends on width of object)
        for (let currWidth = 0; currWidth < width; currWidth++) {
          for (let currSnap = 1; currSnap <= squaresMoved; currSnap++) {
            if (ingredients2d[y - currSnap][x + currWidth] !== null) {
              console.log(
                `[IsResizePossible] FALSE - Cell ${x + currWidth}, ${
                  y - currSnap
                } is occupied`
              );
              return false;
            } else {
              console.log(
                `[IsResizePossible] Cell ${x + currWidth}, ${
                  y - currSnap
                } is unoccupied`
              );
            }
          }
        }

        return true;
      case ResizeDirection.BOTTOM:
        // return if within bounds
        if (y + squaresMoved + height > ingredients2d.length) {
          console.log("[IsResizePossible] FALSE - Not within bounds");
          return false;
        }

        // checks if all cells are unoccupied (depends on width of object)
        const bottomMost = y + height - 1; // the bottommost cell of the object
        for (let currWidth = 0; currWidth < width; currWidth++) {
          for (let currSnap = 1; currSnap <= squaresMoved; currSnap++) {
            if (ingredients2d[bottomMost + currSnap][x + currWidth] !== null) {
              console.log(
                `[IsResizePossible] FALSE - Cell ${x + currWidth}, ${
                  bottomMost + currSnap
                } is occupied`
              );
              return false;
            } else {
              console.log(
                `[IsResizePossible] Cell ${x + currWidth}, ${
                  bottomMost + currSnap
                } is unoccupied`
              );
            }
          }
        }

        return true;
      case ResizeDirection.LEFT:
        // return if within bounds
        if (x - squaresMoved < 0) {
          console.log("[IsResizePossible] FALSE - Not within bounds");
          return false;
        }

        // checks if all cells are unoccupied (depends on height of object)
        for (let currHeight = 0; currHeight < height; currHeight++) {
          for (let currSnap = 1; currSnap <= squaresMoved; currSnap++) {
            if (ingredients2d[y + currHeight][x - currSnap] !== null) {
              console.log(
                `[IsResizePossible] FALSE - Cell ${x - currSnap}, ${
                  y + currHeight
                } is occupied`
              );
              return false;
            } else {
              console.log(
                `[IsResizePossible] Cell ${x - currSnap}, ${
                  y + currHeight
                } is unoccupied`
              );
            }
          }
        }

        return true;
      case ResizeDirection.RIGHT:
        // return if within bounds
        if (x + width + squaresMoved > ingredients2d[y].length) {
          console.log("[IsResizePossible] FALSE - Not within bounds");
          return false;
        }

        // checks if all cells are unoccupied (depends on height of object)
        const rightMost = x + width - 1; // the rightmost cell of the object
        for (let currHeight = 0; currHeight < height; currHeight++) {
          for (let square = 1; square <= squaresMoved; square++) {
            if (ingredients2d[y + currHeight][rightMost + square] !== null) {
              console.log(
                `[IsResizePossible] FALSE - Cell ${rightMost + square}, ${
                  y + currHeight
                } is occupied`
              );
              return false;
            } else {
              console.log(
                `[IsResizePossible] Cell ${rightMost + square}, ${
                  y + currHeight
                } is unoccupied`
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

  resizeObject: ({
    // can be positive or negative in the direction of resize
    squaresMoved,
  }: ShouldResizeCallbackProps) => {
    // get the required fields from store
    const {
      directionOfResize,
      coordinateOfObject,
      bentoIngredients,
      bentoIngredientsGrid,
    } = get();

    // parse input and get the required information
    const result = parseResizeInput(
      directionOfResize,
      coordinateOfObject,
      bentoIngredientsGrid,
      squaresMoved
    );

    // return if input is invalid. can't resize
    if (!result.isValid || !directionOfResize) return;

    // destructure the result
    const { x, y, width, height, objectBeingResized, resizeType } = result;

    console.log(
      `[ResizeObject] ${height}x${width} at (${x}, ${y}) is being resized ${directionOfResize} (${resizeType}) by ${squaresMoved} squares`
    );

    // TODO:
    // come up with another variable name for squaresMoved
    let squaresMovedClamped = squaresMoved;

    // There are only three conditions:
    if (squaresMoved === 0) {
      console.log("[ResizeObject] NO SQUARES MOVED");
      return;
    } else if (resizeType === ResizeType.EXPAND) {
      // handle squaresMoved too large when expanding

      switch (directionOfResize) {
        case ResizeDirection.TOP:
          break;
        case ResizeDirection.BOTTOM:
          break;
        case ResizeDirection.LEFT:
          break;
        case ResizeDirection.RIGHT:
          break;
      }
    } else if (resizeType === ResizeType.SHRINK) {
      // handle squaresMoved too negative when shrinking

      switch (directionOfResize) {
        case ResizeDirection.TOP:
        case ResizeDirection.BOTTOM:
          // compute the final height
          const finalHeight = computeNewHeight(
            height,
            directionOfResize,
            squaresMoved
          );

          // if finalHeight is negative, let squaresMovedClamped = 1 - height
          // so finalHeight = height + squaresMovedClamped = 1
          if (finalHeight <= 0) squaresMovedClamped = 1 - height;

          break;
        case ResizeDirection.LEFT:
        case ResizeDirection.RIGHT:
          // compute the final width
          const finalWidth = computeNewWidth(
            width,
            directionOfResize,
            squaresMoved
          );

          // if finalWidth is negative, let squaresMovedClamped = 1 - width
          // so finalWidth = width + squaresMovedClamped = 1
          if (finalWidth <= 0) squaresMovedClamped = 1 - width;

          break;
      }
    } else {
      // throw error
      throw new Error("Invalid resize type");
    }

    console.log("====================RESIZING====================");

    // resize the object
    const [newBentoIngredients, newbentoIngredientsGrid] = performResizing(
      objectBeingResized,
      directionOfResize,
      squaresMovedClamped,
      bentoIngredients,
      bentoIngredientsGrid
    );

    // update bentoIngredients and bentoIngredientsGrid
    set({
      bentoIngredients: newBentoIngredients,
      bentoIngredientsGrid: newbentoIngredientsGrid,
    });
  },
});

// ----------------------------------------------------------------------
// Helper Functions
// ----------------------------------------------------------------------

const performResizing = (
  objectBeingResized: BentoIngredientType,
  directionOfResize: ResizeDirection,
  squaresMoved: number,
  bentoIngredients: BentoIngredientType[],
  bentoIngredientsGrid: BentoIngredientsGrid
): [BentoIngredientType[], BentoIngredientsGrid] => {
  const { x, y } = objectBeingResized.coordinate;
  const { width, height } = objectBeingResized;

  console.log(
    `[PerformResizing] ${height}x${width} at (${x}, ${y}) is being resized ${directionOfResize} by ${squaresMoved} squares`
  );

  // construct the new object
  const newObject: BentoIngredientType = {
    ...objectBeingResized,
    width: computeNewWidth(width, directionOfResize, squaresMoved),
    height: computeNewHeight(height, directionOfResize, squaresMoved),
    coordinate: computeNewCoordinate(
      objectBeingResized.coordinate,
      directionOfResize,
      squaresMoved
    ),
  };

  // replace the object being resized with the new object
  const newBentoIngredients = bentoIngredients.map((ingredient) => {
    if (ingredient === objectBeingResized) return newObject;
    else return ingredient;
  });

  const newbentoIngredientsGrid = bentoIngredientsGrid;
  const { x: newX, y: newY } = newObject.coordinate;
  const { width: newWidth, height: newHeight } = newObject;

  // set the occupied cells to newObject
  for (let i = 0; i < newObject.height; i++) {
    for (let j = 0; j < newObject.width; j++) {
      newbentoIngredientsGrid[newY + i][newX + j] = newObject;
    }
  }

  // if shrinking, we need to remove the unoccupied cells left from shrinking
  if (squaresMoved < 0) {
    switch (directionOfResize) {
      case ResizeDirection.TOP:
        const topMost = newY;
        for (let i = 0; i < width; i++) {
          for (let j = 0; j < Math.abs(squaresMoved); j++) {
            newbentoIngredientsGrid[topMost - j - 1][newX + i] = null;
          }
        }
        break;
      case ResizeDirection.BOTTOM:
        const bottomMost = newY + newHeight;
        for (let i = 0; i < Math.abs(squaresMoved); i++) {
          for (let j = 0; j < width; j++) {
            newbentoIngredientsGrid[bottomMost + i][newX + j] = null;
          }
        }
        break;
      case ResizeDirection.LEFT:
        const leftMost = newX;
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < Math.abs(squaresMoved); j++) {
            newbentoIngredientsGrid[newY + i][leftMost - j - 1] = null;
            console.log(
              `[PerformResizing] Removing (${leftMost - j - 1}, ${newY + i})`
            );
          }
        }
        break;
      case ResizeDirection.RIGHT:
        const rightMost = newX + newWidth;
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < Math.abs(squaresMoved); j++) {
            newbentoIngredientsGrid[newY + i][rightMost + j] = null;
          }
        }
        break;
    }
  }

  return [newBentoIngredients, newbentoIngredientsGrid];
};

const computeNewCoordinate = (
  coordinate: Coordinates,
  directionOfResize: ResizeDirection,
  sizeOfResize: number
): Coordinates => {
  const { x, y } = coordinate;

  switch (directionOfResize) {
    case ResizeDirection.TOP:
      return { x, y: y - sizeOfResize };
    case ResizeDirection.BOTTOM:
      return { x, y };
    case ResizeDirection.LEFT:
      return { x: x - sizeOfResize, y };
    case ResizeDirection.RIGHT:
      return { x, y };
  }
};

const computeNewHeight = (
  height: number,
  directionOfResize: ResizeDirection,
  sizeOfResize: number
): number => {
  switch (directionOfResize) {
    case ResizeDirection.TOP:
    case ResizeDirection.BOTTOM:
      return height + sizeOfResize;
    case ResizeDirection.LEFT:
    case ResizeDirection.RIGHT:
      return height;
  }
};

const computeNewWidth = (
  width: number,
  directionOfResize: ResizeDirection,
  sizeOfResize: number
): number => {
  switch (directionOfResize) {
    case ResizeDirection.TOP:
    case ResizeDirection.BOTTOM:
      return width;
    case ResizeDirection.LEFT:
    case ResizeDirection.RIGHT:
      return width + sizeOfResize;
  }
};

type ResizeObjectParsedInputType =
  | {
      isValid: false;
    }
  | {
      isValid: true;
      x: number;
      y: number;
      width: number;
      height: number;
      objectBeingResized: BentoIngredientType;
      resizeType: ResizeType;
    };

const parseResizeInput = (
  directionOfResize: ResizeDirection | null,
  coordinateOfObject: Coordinates | null,
  bentoIngredientsGrid: BentoIngredientsGrid,
  squaresMoved: number
): ResizeObjectParsedInputType => {
  // isValid is false if any of the required fields are null
  if (!directionOfResize || !coordinateOfObject) return { isValid: false };

  // compute the necessary fields
  const { x, y } = coordinateOfObject;
  const objectBeingResized = bentoIngredientsGrid[y][x];

  // isValid is false if the object being resized is null
  if (!objectBeingResized) return { isValid: false };

  // compute the necessary fields
  const { width, height } = objectBeingResized;
  const resizeType = computeResizeType(squaresMoved);

  // successfully parsed the input. return the necessary fields
  return {
    isValid: true,
    x,
    y,
    width,
    height,
    objectBeingResized,
    resizeType,
  };
};
