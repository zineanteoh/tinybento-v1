"use client";
import { useId } from "react";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import { Coordinates } from "@/components/Bento";
import { useStore } from "@/store/store";
import {
  convertStringToCoordinate,
  convertStringToIngredient,
} from "@/utils/helper";
import { Ingredient } from "@/store/demo1-store";
import { IngredientVariant } from "@/components/Ingredient";

// READ: https://nextjs.org/docs/app/building-your-application/routing/route-groups
// this layout will be shared by all pages in the "(demo)" Route Group
const DemoLayout = (props: {
  children: React.ReactNode;
  sidebarLeft: React.ReactNode;
  sidebarRight: React.ReactNode;
}) => {
  const id = useId();
  const { addDroppedIngredient, clearPreview, setDragging } = useStore();

  const handleDragStart = (event: DragEndEvent) => {
    const ingredient: Ingredient = convertStringToIngredient(
      event.active.id.toString()
    );
    setDragging(ingredient);
  };

  // where the magic happens
  const handleDragEnd = (event: DragEndEvent) => {
    console.log("END DRAGGING");
    if (event.over && event.over.id !== null) {
      const droppedCoordinate: Coordinates = convertStringToCoordinate(
        event.over.id as string
      );
      // use the APIs provided by store to update bento state
      clearPreview();
      addDroppedIngredient(droppedCoordinate);
    }

    setDragging(null);
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <DndContext
        id={id}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        autoScroll={false}
        collisionDetection={pointerWithin}
      >
        {props.sidebarLeft}
        {props.children}
        {props.sidebarRight}
      </DndContext>
    </div>
  );
};

export default DemoLayout;
