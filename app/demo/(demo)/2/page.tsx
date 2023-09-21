"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const MoveableSquare = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={styles.square}
    >
      IM JACOB
    </div>
  );
};

const DroppableSquare = (props: { children: React.ReactNode }) => {
  // use droppable
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    padding: 20,
    backgroundColor: isOver ? "green" : "red",
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.square}>
      {props.children}
    </div>
  );
};

const Demo2 = () => {
  const [isDropped, setIsDropped] = useState(false);

  const onDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  };

  return (
    <div className={styles.container}>
      <DndContext onDragEnd={onDragEnd}>
        <div className={styles.bentoSpace}>
          <DroppableSquare>
            {isDropped ? <MoveableSquare /> : "Drop Here"}
          </DroppableSquare>
        </div>
        <div className={styles.sidebar}>
          {!isDropped ? <MoveableSquare /> : null}
        </div>
      </DndContext>
    </div>
  );
};

export default Demo2;
