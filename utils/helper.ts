import {
  CSSPosition,
  Coordinates,
  Dimension,
  DirectionMultiplier,
  DraggableIngredient,
  DraggableType,
  IngredientVariant,
  ResizeDirection,
  ResizeType,
} from "@/utils/interfaces";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

// ============================================================================
// General Helper Functions
// ============================================================================

/**
 * Converts "x,y" string to Coordinates object
 * @param str string in format "x,y"
 * @returns   Coordinates object
 */
export const convertStringToCoordinate = (str: string): Coordinates => {
  const [x, y] = str.split(",").map((item) => parseInt(item));
  return { x, y };
};

/**
 * Converts DndKit DragEvent to DraggableIngredient object
 * @param dragEvent DragStartEvent or DragEndEvent
 * @returns   DraggableIngredient object
 */
export const convertDragEventToIngredient = (
  dragEvent: DragStartEvent | DragEndEvent
): DraggableIngredient => {
  const id = dragEvent.active.id.toString();
  console.log("id is this: ", id);
  const [height, width] = id.split("x").map((item) => parseInt(item));
  const draggableType = dragEvent.active.data.current?.type as DraggableType;

  return {
    id,
    type: draggableType,
    width,
    height,
    variant: IngredientVariant.DROPPED,
    ...(draggableType === DraggableType.IN_BENTO && {
      coordinate: dragEvent.active.data.current?.coordinate,
    }),
  };
};
