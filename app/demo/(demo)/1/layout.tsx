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
  const { addDropped, setDragging } = useStore();

  const handleDragStart = (event: DragEndEvent) => {
    setDragging(event.active.id.toString());
  };

  // where the magic happens
  const handleDragEnd = (event: DragEndEvent) => {
    setDragging(null);

    if (event.over && event.over.id !== null) {
      // use the APIs provided by store to update bento state
      addDropped(event.active.id.toString());
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
