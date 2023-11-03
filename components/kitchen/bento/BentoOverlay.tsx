import React from "react";
import { useStore } from "@/store/kitchen-store/store";
import { DraggableType } from "@/utils/interfaces";
import { DragOverlay } from "@dnd-kit/core";
import addIngredientDraggableStyles from "@/components/kitchen/bento/draggable/AddIngredientDraggable.module.css";

/**
 * BentoOverlay shows Bento-related draggables
 * This is necessary because dnd works by creating a clone of the draggable element
 * Read: https://docs.dndkit.com/api-documentation/draggable/drag-overlay
 */
const BentoOverlay = () => {
  const { dragging } = useStore();

  return (
    <DragOverlay
      dropAnimation={{
        duration: 1,
        easing: "cubic-bezier(.22,.75,.83,.21)",
      }}
    >
      {dragging && (
        <>
          {dragging.type === DraggableType.IN_ADD_INGREDIENT && (
            // TODO: this will be icons, instead of div + stylings
            <div className={addIngredientDraggableStyles.draggable}>
              {dragging.height}x{dragging.width}
            </div>
          )}

          {dragging.type === DraggableType.IN_BENTO && (
            // TODO: this will be div + stylings
            <div>Hello In bento</div>
          )}
        </>
      )}
    </DragOverlay>
  );
};

export default BentoOverlay;
