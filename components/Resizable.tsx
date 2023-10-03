"use client";
import React, { useState } from "react";
import styles from "./Resizable.module.css";
import {
  Coordinates,
  DirectionMultiplier,
  ResizeDirection,
  ResizeEndCallbackProps,
  ResizeStartCallbackProps,
  ResizeType,
  ShouldResizeCallbackProps,
} from "@/utils/interfaces";
import { computeResizeType } from "@/utils/helper";

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
  squareWidth = 50, // The width of a single square
  squareHeight = 50, // The height of a single square
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
  coordinate?: Coordinates;
  childStyleToApply?: React.CSSProperties;
  squareWidth?: number;
  squareHeight?: number;
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

    // keep track of the previous size of resize to prevent unnecessary calls to shouldResizeCallback
    let previousSquaresMoved = 0;

    // keep track of the previous valid squaresMoved (for pointerup callback)
    let previousValidSquaresMoved = 0;

    // create function to be called when pointer move
    const onPointerMove = (e: MouseEvent) => {
      // define a lot of variables
      const dX = e.clientX - startX;
      const squaresMoved =
        Math.round(dX / squareWidth) * DirectionMultiplier.LEFT; // can be postive or negative
      const resizeType = computeResizeType(squaresMoved);
      const relativeDistanceMoved = squaresMoved * squareWidth;
      const newWidth = startSize.width + relativeDistanceMoved;
      const newLeft = startPosition.left - relativeDistanceMoved;

      // prevent unnecessary calls to shouldResizeCallback
      if (previousSquaresMoved === squaresMoved) return;

      // There are only three conditions:
      if (squaresMoved === 0) {
        // 1. neither expand nor shrink. should revert to original size and position
        setSize({
          width: startSize.width,
          height: startSize.height,
        });
        setPosition({
          top: startPosition.top,
          left: startPosition.left,
        });
        previousValidSquaresMoved = squaresMoved;
      } else if (resizeType === ResizeType.EXPAND) {
        // 2. expand. only resize if resizeCallback allows it
        if (shouldResizeCallback({ squaresMoved })) {
          setSize({
            width: newWidth,
            height: startSize.height,
          });
          setPosition({
            top: startPosition.top,
            left: newLeft,
          });
          previousValidSquaresMoved = squaresMoved;
        }
      } else if (resizeType === ResizeType.SHRINK) {
        // 3. shrink to the smallest possible size
        setSize({
          width: Math.max(newWidth, Math.ceil(135 / squareWidth) * 135),
          height: startSize.height,
        });
        setPosition({
          top: startPosition.top,
          left: Math.min(newLeft, startPosition.left + startSize.width - 135),
        });

        // TODO: is this right?
        previousValidSquaresMoved = Math.min(
          squaresMoved,
          Math.ceil(135 / squareWidth) * DirectionMultiplier.LEFT
        );
      } else {
        // throw error
        console.error("Should not reach here!");
      }

      // update previousSquaresMoved
      previousSquaresMoved = squaresMoved;
    };

    // create function to remove event listeners when pointer up
    const onPointerUp = (e: MouseEvent) => {
      onResizeEndCallback({ squaresMoved: previousValidSquaresMoved });
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

    // keep track of the previous size of resize to prevent unnecessary calls to shouldResizeCallback
    let previousSquaresMoved = 0;

    // keep track of the previous valid squaresMoved (for pointerup callback)
    let previousValidSquaresMoved = 0;

    // create function to be called when pointer move
    const onPointerMove = (e: MouseEvent) => {
      // define a lot of variables
      const dY = e.clientY - startY;
      const squaresMoved =
        Math.round(dY / squareHeight) * DirectionMultiplier.TOP;
      const resizeType = computeResizeType(squaresMoved);
      const relativeDistanceMoved = squaresMoved * squareHeight;
      const newHeight = startSize.height + relativeDistanceMoved;
      const newTop = startPosition.top - relativeDistanceMoved;

      // prevent unnecessary calls to shouldResizeCallback
      if (previousSquaresMoved === squaresMoved) return;

      // There are only three conditions:
      if (squaresMoved === 0) {
        // 1. neither expand nor shrink. should revert to original size and position
        setSize({
          width: startSize.width,
          height: startSize.height,
        });
        setPosition({
          top: startPosition.top,
          left: startPosition.left,
        });
        previousValidSquaresMoved = squaresMoved;
      } else if (resizeType === ResizeType.EXPAND) {
        // 2. expand. only resize if resizeCallback allows it
        if (shouldResizeCallback({ squaresMoved })) {
          setSize({
            width: startSize.width,
            height: newHeight,
          });
          setPosition({
            top: newTop,
            left: startPosition.left,
          });
          previousValidSquaresMoved = squaresMoved;
        }
      } else if (resizeType === ResizeType.SHRINK) {
        // 3. shrink to the smallest possible size
        setSize({
          width: startSize.width,
          height: Math.max(newHeight, Math.ceil(135 / squareHeight) * 135),
        });
        setPosition({
          top: Math.min(newTop, startPosition.top + startSize.height - 135),
          left: startPosition.left,
        });

        // TODO: is this right?
        previousValidSquaresMoved = Math.min(
          squaresMoved,
          Math.ceil(135 / squareHeight) * DirectionMultiplier.TOP
        );
      } else {
        // throw error
        console.error("Should not reach here!");
      }

      // update previousSquaresMoved
      previousSquaresMoved = squaresMoved;
    };

    // create function to remove event listeners when pointer up
    const onPointerUp = (e: MouseEvent) => {
      onResizeEndCallback({ squaresMoved: previousValidSquaresMoved });
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

    // keep track of the previous squaresMoved to prevent unnecessary calls to shouldResizeCallback
    let previousSquaresMoved = 0;

    // keep track of the previous valid squaresMoved (for pointerup callback)
    let previousValidSquaresMoved = 0;

    // create function to be called when pointer move
    const onPointerMove = (e: MouseEvent) => {
      // define a lot of variables
      const dX = e.clientX - startX;
      const squaresMoved =
        Math.round(dX / squareWidth) * DirectionMultiplier.RIGHT; // can be postive or negative
      const resizeType = computeResizeType(squaresMoved);
      const relativeDistanceMoved = squaresMoved * squareWidth;
      const newWidth = startSize.width + relativeDistanceMoved;

      // prevent unnecessary calls to shouldResizeCallback
      if (previousSquaresMoved === squaresMoved) return;

      // There are only three conditions:
      if (squaresMoved === 0) {
        // 1. neither expand nor shrink. should revert to original size and position
        setSize({
          width: startSize.width,
          height: startSize.height,
        });
        previousValidSquaresMoved = squaresMoved;
      } else if (resizeType === ResizeType.EXPAND) {
        // 2. expand. only resize if resizeCallback allows it
        if (shouldResizeCallback({ squaresMoved })) {
          setSize({
            width: newWidth,
            height: startSize.height,
          });
          previousValidSquaresMoved = squaresMoved;
        }
      } else if (resizeType === ResizeType.SHRINK) {
        // 3. shrink to the smallest possible size
        setSize({
          // TODO: where is 135 coming from? should take from props somehow
          // currently, 135 = width of a 1x1 ingredient
          width: Math.max(newWidth, Math.ceil(135 / squareWidth) * 135),
          height: startSize.height,
        });
        previousValidSquaresMoved = Math.min(
          squaresMoved,
          Math.ceil(135 / squareWidth) * DirectionMultiplier.RIGHT
        );
      } else {
        // throw error
        console.error("Should not reach here!");
      }

      // update previousSquaresMoved
      previousSquaresMoved = squaresMoved;
    };

    // create function to remove event listeners when pointer up
    const onPointerUp = (e: MouseEvent) => {
      onResizeEndCallback({ squaresMoved: previousValidSquaresMoved });
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

    // keep track of the previous size of resize to prevent unnecessary calls to shouldResizeCallback
    let previousSquaresMoved = 0;

    // keep track of the previous valid squaresMoved (for pointerup callback)
    let previousValidSquaresMoved = 0;

    // create function to be called when pointer move
    const onPointerMove = (e: MouseEvent) => {
      // define a lot of variables
      const dY = e.clientY - startY;
      const squaresMoved =
        Math.round(dY / squareHeight) * DirectionMultiplier.BOTTOM;
      const resizeType = computeResizeType(squaresMoved);
      const relativeDistanceMoved = squaresMoved * squareHeight;
      const newHeight = startSize.height + relativeDistanceMoved;

      // prevent unnecessary calls to shouldResizeCallback
      if (previousSquaresMoved === squaresMoved) return;

      // There are only three conditions:
      if (squaresMoved === 0) {
        // 1. neither expand nor shrink. should revert to original size and position
        setSize({
          width: startSize.width,
          height: startSize.height,
        });
        previousValidSquaresMoved = squaresMoved;
      } else if (resizeType === ResizeType.EXPAND) {
        // 2. expand. only resize if resizeCallback allows it
        if (shouldResizeCallback({ squaresMoved })) {
          setSize({
            width: startSize.width,
            height: newHeight,
          });
          previousValidSquaresMoved = squaresMoved;
        }
      } else if (resizeType === ResizeType.SHRINK) {
        // 3. shrink to the smallest possible size
        setSize({
          width: startSize.width,
          height: Math.max(newHeight, Math.ceil(135 / squareHeight) * 135),
        });

        previousValidSquaresMoved = Math.min(
          squaresMoved,
          Math.ceil(135 / squareHeight) * DirectionMultiplier.BOTTOM
        );
      } else {
        // throw error
        console.error("Should not reach here!");
      }

      // update previousSquaresMoved
      previousSquaresMoved = squaresMoved;
    };

    // create function to remove event listeners when pointer up
    const onPointerUp = (e: MouseEvent) => {
      onResizeEndCallback({ squaresMoved: previousValidSquaresMoved });
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

        {/* TODO: remove. for debug only */}
        <div>W{size.width}</div>
        <div>H{size.height}</div>
        <div>L{position.left}</div>
        <div>T{position.top}</div>
      </div>
    </div>
  );
};

export default Resizable;
