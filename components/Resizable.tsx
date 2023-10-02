"use client";
import React, { useState } from "react";
import styles from "./Resizable.module.css";
import { ResizeDirection } from "@/store/resizeSlice";

export interface ResizeStartCallbackProps {
  coordinateOfObject: { x: number; y: number };
  directionOfResize: ResizeDirection;
}

export interface ResizeEndCallbackProps {
  snapSize: number;
}

/**
 * A custom wrapper for creating a resizable component.
 *
 * It renders 4 borders around the children component and allows resizing
 * via dragging the borders (implemented via event listeners).
 *
 * Optionally provide callback functions to be called
 */
const Resizable = ({
  children, // The children to render inside the resizable component
  childWidth = 100, // The width of the children component
  childHeight = 100, // The height of the children component
  coordinate = { x: 0, y: 0 }, // The coordinate of the children component
  childStyleToApply, // The style to apply to the children component
  snapXGap = 50, // The gap to snap to when resizing horizontally
  snapYGap = 50, // The gap to snap to when resizing vertically
  borderWidth = 8, // The width of the border
  borderColor = "pink", // The color of the border
  startTop = 0, // The starting top position of the resizable component
  startLeft = 0, // The starting left position of the resizable component
  onResizeStartCallback = () => {}, // The callback to call when resizing starts
  onResizeEndCallback = () => {}, // The callback to call when resizing ends
}: {
  children: React.ReactNode;
  childWidth?: number;
  childHeight?: number;
  coordinate?: { x: number; y: number };
  childStyleToApply?: React.CSSProperties;
  snapXGap?: number;
  snapYGap?: number;
  borderWidth?: number;
  borderColor?: string;
  startTop?: number;
  startLeft?: number;
  onResizeStartCallback?: (...arg: ResizeStartCallbackProps[]) => void;
  onResizeEndCallback?: (...arg: ResizeEndCallbackProps[]) => void;
}) => {
  // keep track of the size of the resizable component
  const [size, setSize] = useState({
    x: childWidth,
    y: childHeight,
  });
  // keep track of the position (in px) of the component relative to the parent
  const [position, setPosition] = useState({
    top: startTop,
    left: startLeft,
  });

  // create function to prevent default (needed for better UX)
  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  // handles resizing from the left border
  const handleLeftBorderPointerDown = (e: React.MouseEvent<HTMLDivElement>) => {
    onResizeStartCallback({
      coordinateOfObject: coordinate,
      directionOfResize: ResizeDirection.LEFT,
    });

    // save the start size, position and pointer position
    const startSize = size;
    const startPosition = position;
    const startX = e.clientX;

    // create function to be called when pointer move
    const onPointerMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;

      // snap to the nearest gap
      const snappedDeltaX = Math.round(deltaX / snapXGap) * snapXGap;

      if (startSize.x - snappedDeltaX >= 0) {
        setSize({
          x: startSize.x - snappedDeltaX,
          y: startSize.y,
        });
        setPosition({
          top: startPosition.top,
          left: startPosition.left + snappedDeltaX,
        });
      }
    };

    // create function to remove event listeners when pointer up
    const onPointerUp = (e: MouseEvent) => {
      onResizeEndCallback({
        snapSize: -Math.round((e.clientX - startX) / snapXGap),
      });
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("contextmenu", onContextMenu);
    };

    // add event listeners
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("contextmenu", onContextMenu);
  };

  // handles resizing from the top border
  const handleTopBorderPointerDown = (e: React.MouseEvent<HTMLDivElement>) => {
    onResizeStartCallback({
      coordinateOfObject: coordinate,
      directionOfResize: ResizeDirection.TOP,
    });

    // save the start size, position and pointer position
    const startSize = size;
    const startPosition = position;
    const startY = e.clientY;

    // create function to be called when pointer move
    const onPointerMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;

      // snap to the nearest gap
      const snappedDeltaY = Math.round(deltaY / snapYGap) * snapYGap;

      if (startSize.y - snappedDeltaY >= 0) {
        setSize({
          x: startSize.x,
          y: startSize.y - snappedDeltaY,
        });
        setPosition({
          top: startPosition.top + snappedDeltaY,
          left: startPosition.left,
        });
      }
    };

    // create function to remove event listeners when pointer up
    const onPointerUp = (e: MouseEvent) => {
      onResizeEndCallback({
        snapSize: -Math.round((e.clientY - startY) / snapYGap),
      });
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("contextmenu", onContextMenu);
    };

    // add event listeners
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("contextmenu", onContextMenu);
  };

  // handles resizing from the right border
  const handleRightBorderPointerDown = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    onResizeStartCallback({
      coordinateOfObject: coordinate,
      directionOfResize: ResizeDirection.RIGHT,
    });

    // save the start size and pointer position
    const startSize = size;
    const startX = e.clientX;

    // create function to be called when pointer move
    const onPointerMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;

      // snap to the nearest gap
      const snappedDeltaX = Math.round(deltaX / snapXGap) * snapXGap;

      if (startSize.x + snappedDeltaX >= 0) {
        setSize({
          x: startSize.x + snappedDeltaX,
          y: startSize.y,
        });
      }
    };

    // create function to remove event listeners when pointer up
    const onPointerUp = (e: MouseEvent) => {
      onResizeEndCallback({
        snapSize: Math.round((e.clientX - startX) / snapXGap),
      });
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("contextmenu", onContextMenu);
    };

    // add event listeners
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("contextmenu", onContextMenu);
  };

  // handles resizing from the bottom border
  const handleBottomBorderPointerDown = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    onResizeStartCallback({
      coordinateOfObject: coordinate,
      directionOfResize: ResizeDirection.BOTTOM,
    });

    // save the start size and position
    const startSize = size;
    const startY = e.clientY;

    // create function to be called when pointer move
    const onPointerMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;

      // snap to the nearest gap
      const snappedDeltaY = Math.round(deltaY / snapYGap) * snapYGap;

      if (startSize.y + snappedDeltaY >= 0) {
        setSize({
          x: startSize.x,
          y: startSize.y + snappedDeltaY,
        });
      }
    };

    // create function to remove event listeners when pointer up
    const onPointerUp = (e: MouseEvent) => {
      onResizeEndCallback({
        snapSize: Math.round((e.clientY - startY) / snapYGap),
      });
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("contextmenu", onContextMenu);
    };

    // add event listeners
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("contextmenu", onContextMenu);
  };

  return (
    <div
      style={{
        position: "absolute",
        width: size.x + borderWidth * 2,
        height: size.y + borderWidth * 2,
        top: position.top,
        left: position.left,
      }}
    >
      {/* left border */}
      <div
        className={`${styles.border} ${styles.left}`}
        style={{
          backgroundColor: borderColor,
          width: borderWidth,
          height: size.y + borderWidth * 2,
          top: 0,
          left: 0,
        }}
        onPointerDown={handleLeftBorderPointerDown}
      />
      {/* top border */}
      <div
        className={`${styles.border} ${styles.top}`}
        style={{
          backgroundColor: borderColor,
          width: size.x + borderWidth * 2,
          height: borderWidth,
          top: 0,
          left: 0,
        }}
        onPointerDown={handleTopBorderPointerDown}
      />
      {/* right border */}
      <div
        className={`${styles.border} ${styles.right}`}
        style={{
          backgroundColor: borderColor,
          width: borderWidth,
          height: size.y + borderWidth * 2,
          top: 0,
          left: size.x + borderWidth,
        }}
        onPointerDown={handleRightBorderPointerDown}
      />
      {/* bottom border */}
      <div
        className={`${styles.border} ${styles.bottom}`}
        style={{
          backgroundColor: borderColor,
          width: size.x + borderWidth * 2,
          height: borderWidth,
          top: size.y + borderWidth,
          left: 0,
        }}
        onPointerDown={handleBottomBorderPointerDown}
      />

      {/* children */}
      <div
        style={{
          ...childStyleToApply,
          position: "absolute",
          width: size.x,
          height: size.y,
          left: borderWidth,
          top: borderWidth,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Resizable;
