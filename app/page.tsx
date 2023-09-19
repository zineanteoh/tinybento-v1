"use client";
import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import Draggable from "../components/Draggable";
import Droppable from "../components/Droppable";

const Home = () => {
  const [isDropped, setIsDropped] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === "droppable-1") {
      setIsDropped(true);
    }
  };

  const draggableMarker = <Draggable>Drag Me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Droppable>{isDropped ? draggableMarker : "Drop Here"}</Droppable>
      {!isDropped ? draggableMarker : null}
    </DndContext>
  );
};

export default Home;
