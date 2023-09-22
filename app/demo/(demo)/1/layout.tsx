"use client";
import { useId } from "react";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import { Coordinates } from "@/components/demo-1/Bento";
import { useStore } from "@/store/store";
import { convertStringToCoordinate } from "@/utils/helper";

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
    if (event.over && event.over.id !== null) {
      const coordinate: Coordinates = convertStringToCoordinate(
        event.over.id as string
      );
      // use the APIs provided by store to update bento state
      addDropped(event.active.id.toString(), coordinate);
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
