"use client";
import { useId } from "react";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import { useStore } from "@/store/store";

// READ: https://nextjs.org/docs/app/building-your-application/routing/route-groups
// this layout will be shared by all pages in the "(demo)" Route Group
const DemoLayout = (props: {
  children: React.ReactNode;
  sidebarLeft: React.ReactNode;
  sidebarRight: React.ReactNode;
}) => {
  const id = useId();
  const { setIsDropped, addDroppedIngredient } = useStore();

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === "droppable-1") {
      setIsDropped(true);
      addDroppedIngredient(event.active.id.toString());
    }
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <DndContext
        id={id}
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
