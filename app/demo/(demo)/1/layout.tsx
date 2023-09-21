"use client";
import { useState } from "react";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import DraggableIngredient from "@/components/demo-1/DraggableIngredient";

// READ: https://nextjs.org/docs/app/building-your-application/routing/route-groups
// this layout will be shared by all pages in the "(demo)" Route Group
const DemoLayout = (props: {
  children: React.ReactNode;
  sidebarLeft: React.ReactNode;
  sidebarRight: React.ReactNode;
}) => {
  const [isDropped, setIsDropped] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === "droppable-1") {
      setIsDropped(true);
    }
  };

  const draggableMarker = (
    <DraggableIngredient>{props.children}</DraggableIngredient>
  );

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <DndContext
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
