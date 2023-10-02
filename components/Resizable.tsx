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

export interface ShouldResizeCallbackProps {
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
  shouldResizeCallback = () => true, // The callback to call when resizing starts and pointer moves
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
  shouldResizeCallback?: (...arg: ShouldResizeCallbackProps[]) => boolean;
}) => {
  // keep track of the size of the resizable component
  const [size, setSize] = useState({
    width: childWidth,
    height: childHeight,
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

    // keep track of the previous snap size to prevent unnecessary calls to shouldResizeCallback
    let previousSnapSize = 0;

    // create function to be called when pointer move
    const onPointerMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX; // the distance the pointer has moved
      const gapSize = Math.round(deltaX / snapXGap); // the number of gaps the pointer has moved
      const snappedDeltaX = gapSize * snapXGap; // the distance the pointer has moved, snapped to the nearest gap

      // resize to the smallest possible size if resizing to negative size
      if (startSize.width - snappedDeltaX <= 0 || snappedDeltaX === 0) {
        setSize({
          width: startSize.width,
          height: startSize.height,
        });
        setPosition({
          top: startPosition.top,
          left: startPosition.left,
        });
        previousSnapSize = 0;
        return;
      }

      const snapSize = Math.abs(gapSize);

      // don't resize if snapSize is the same as previousSnapSize
      if (previousSnapSize === snapSize) return;

      // ensure that resizing is allowed by callback
      if (shouldResizeCallback({ snapSize })) {
        // ---- Conditions Satisfied ----
        setSize({
          width: startSize.width - snappedDeltaX,
          height: startSize.height,
        });
        setPosition({
          top: startPosition.top,
          left: startPosition.left + snappedDeltaX,
        });
      }

      // update previousSnapSize
      previousSnapSize = snapSize;
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

    // keep track of the previous snap size to prevent unnecessary calls to shouldResizeCallback
    let previousSnapSize = 0;

    // create function to be called when pointer move
    const onPointerMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY; // the distance the pointer has moved
      const gapSize = Math.round(deltaY / snapYGap); // the number of gaps the pointer has moved
      const snappedDeltaY = gapSize * snapYGap; // the distance the pointer has moved, snapped to the nearest gap

      // resize to the smallest possible size if resizing to negative size
      if (startSize.height - snappedDeltaY <= 0 || snappedDeltaY === 0) {
        setSize({
          width: startSize.width,
          height: startSize.height,
        });
        setPosition({
          top: startPosition.top,
          left: startPosition.left,
        });
        previousSnapSize = 0;
        return;
      }

      const snapSize = Math.abs(gapSize);

      // don't resize if snapSize is the same as previousSnapSize
      if (previousSnapSize === snapSize) return;

      // ensure that resizing is allowed by callback
      if (shouldResizeCallback({ snapSize })) {
        // ---- Conditions Satisfied ----
        setSize({
          width: startSize.width,
          height: startSize.height - snappedDeltaY,
        });
        setPosition({
          top: startPosition.top + snappedDeltaY,
          left: startPosition.left,
        });
      }

      // update previousSnapSize
      previousSnapSize = snapSize;
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

    // keep track of the previous snap size to prevent unnecessary calls to shouldResizeCallback
    let previousSnapSize = 0;

    // create function to be called when pointer move
    const onPointerMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX; // the distance the pointer has moved
      const gapSize = Math.round(deltaX / snapXGap); // the number of gaps the pointer has moved
      const snappedDeltaX = gapSize * snapXGap; // the distance the pointer has moved, snapped to the nearest gap

      // resize to the smallest possible size if resizing to negative size
      if (startSize.width + snappedDeltaX <= 0 || snappedDeltaX === 0) {
        setSize({
          width: startSize.width,
          height: startSize.height,
        });
        previousSnapSize = 0;
        return;
      }

      const snapSize = Math.abs(gapSize);

      // don't resize if snapSize is the same as previousSnapSize
      if (previousSnapSize === snapSize) return;

      // ensure that resizing is allowed by callback
      if (shouldResizeCallback({ snapSize })) {
        // ---- Conditions Satisfied ----
        setSize({
          width: startSize.width + snappedDeltaX,
          height: startSize.height,
        });
      }

      // update previousSnapSize
      previousSnapSize = snapSize;
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

    // keep track of the previous snap size to prevent unnecessary calls to shouldResizeCallback
    let previousSnapSize = 0;

    // create function to be called when pointer move
    const onPointerMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY; // the distance the pointer has moved
      const gapSize = Math.round(deltaY / snapYGap); // the number of gaps the pointer has moved
      const snappedDeltaY = gapSize * snapYGap; // the distance the pointer has moved, snapped to the nearest gap

      // resize to the smallest possible size if resizing to negative size
      if (startSize.height + snappedDeltaY <= 0 || snappedDeltaY === 0) {
        setSize({
          width: startSize.width,
          height: startSize.height,
        });
        previousSnapSize = 0;
        return;
      }

      const snapSize = Math.abs(gapSize);

      // don't resize if snapSize is the same as previousSnapSize
      if (previousSnapSize === snapSize) return;

      // ensure that resizing is allowed by callback
      if (shouldResizeCallback({ snapSize })) {
        // ---- Conditions Satisfied ----
        setSize({
          width: startSize.width,
          height: startSize.height + snappedDeltaY,
        });
      }

      // update previousSnapSize
      previousSnapSize = snapSize;
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
        width: size.width + borderWidth * 2,
        height: size.height + borderWidth * 2,
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
          height: size.height + borderWidth * 2,
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
          width: size.width + borderWidth * 2,
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
          height: size.height + borderWidth * 2,
          top: 0,
          left: size.width + borderWidth,
        }}
        onPointerDown={handleRightBorderPointerDown}
      />
      {/* bottom border */}
      <div
        className={`${styles.border} ${styles.bottom}`}
        style={{
          backgroundColor: borderColor,
          width: size.width + borderWidth * 2,
          height: borderWidth,
          top: size.height + borderWidth,
          left: 0,
        }}
        onPointerDown={handleBottomBorderPointerDown}
      />

      {/* children */}
      <div
        style={{
          ...childStyleToApply,
          position: "absolute",
          width: size.width,
          height: size.height,
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
