"use client";
import React, { useState } from "react";
import styles, { border } from "./Resizable.module.css";
import {
  DirectionMultiplier,
  ResizableProps,
  ResizeDirection,
  ResizeType,
} from "@/utils/interfaces";
import { computeResizeType } from "@/utils/helper";

/**
 * A custom wrapper for creating a resizable component.
 *
 * It renders 4 borders around the children component and allows resizing
 * via dragging the borders (implemented via event listeners).
 *
 * Optionally provide callback functions to be called
 *
 * e.g. a 1x1 ingredient in a single square of a 4x4 bento:
 *      P = padding
 *      B = border (resizable)
 *      empty space = ingredient content
 *
 *       +-------------------+
 *       |PPPPPPPPPPPPPPPPPPP|
 *       |PBBBBBBBBBBBBBBBBBP|
 *       |PB               BP|
 *       |PB               BP|
 *       |PB               BP|
 *       |PB               BP|
 *       |PB               BP|
 *       |PBBBBBBBBBBBBBBBBBP|
 *       |PPPPPPPPPPPPPPPPPPP|
 *       +-------------------+
 */
const Resizable = ({
  children, // children to render inside the resizable component
  childWidth, // width of the children component (in px)
  childHeight, // height of the children component (in px)
  coordinate, // coordinate of the children component e.g. {x: 0, y: 0}
  squareWidth, // width of a single square (in px)
  squareHeight, // height of a single square (in px)

  // optional stylings
  padding = 20, // padding of the resizable component
  borderWidth = 8, // width of the border
  borderColor = "pink", // color of the border

  // callbacks
  onResizeStartCallback = () => {}, // The callback to call when resizing starts
  onResizeEndCallback = () => {}, // The callback to call when resizing ends
  shouldResizeCallback = () => true, // The callback to call when resizing starts and pointer moves
}: ResizableProps) => {
  // keep track of the size of the resizable component
  const [size, setSize] = useState({
    width: childWidth,
    height: childHeight,
  });
  // keep track of the position (in px) of the component relative to the parent
  const [position, setPosition] = useState({
    top: coordinate.y * squareHeight,
    left: coordinate.x * squareWidth,
  });
  // store the minimized size of 1x1 square
  const minimizedSquareWidth = squareWidth - 2 * padding;
  const minimizedSquareHeight = squareHeight - 2 * padding;

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
          width: Math.max(
            newWidth,
            Math.ceil(minimizedSquareWidth / squareWidth) * minimizedSquareWidth
          ),
          height: startSize.height,
        });
        setPosition({
          top: startPosition.top,
          left: Math.min(
            newLeft,
            startPosition.left + startSize.width - minimizedSquareWidth
          ),
        });

        previousValidSquaresMoved = Math.min(
          squaresMoved,
          Math.ceil(minimizedSquareWidth / squareWidth) *
            DirectionMultiplier.LEFT
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
          height: Math.max(
            newHeight,
            Math.ceil(minimizedSquareHeight / squareHeight) *
              minimizedSquareHeight
          ),
        });
        setPosition({
          top: Math.min(
            newTop,
            startPosition.top + startSize.height - minimizedSquareHeight
          ),
          left: startPosition.left,
        });

        previousValidSquaresMoved = Math.min(
          squaresMoved,
          Math.ceil(minimizedSquareHeight / squareHeight) *
            DirectionMultiplier.TOP
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
          width: Math.max(
            newWidth,
            Math.ceil(minimizedSquareWidth / squareWidth) * minimizedSquareWidth
          ),
          height: startSize.height,
        });
        previousValidSquaresMoved = Math.min(
          squaresMoved,
          Math.ceil(minimizedSquareWidth / squareWidth) *
            DirectionMultiplier.RIGHT
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
          height: Math.max(
            newHeight,
            Math.ceil(minimizedSquareHeight / squareHeight) *
              minimizedSquareHeight
          ),
        });

        previousValidSquaresMoved = Math.min(
          squaresMoved,
          Math.ceil(minimizedSquareHeight / squareHeight) *
            DirectionMultiplier.BOTTOM
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
        top: position.top + padding / 2 + 2, // add 2 to account for top+down border
        left: position.left + padding / 2 + 2, // add 2 to account for left+right border
      }}
    >
      {/* left border */}
      <div
        className={`${styles.border} ${styles.left}`}
        style={{
          backgroundColor: borderColor,
          width: borderWidth,
          height: size.height + borderWidth * 2,
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
        }}
        onPointerDown={handleBottomBorderPointerDown}
      />

      {/* children */}
      <div
        style={{
          position: "absolute",
          width: size.width,
          height: size.height,
          left: borderWidth,
          top: borderWidth,
        }}
      >
        {children}
      </div>

      {/* TODO: remove. for debug only */}
      <div
        style={{
          position: "absolute",
          top: borderWidth,
          left: borderWidth,
          color: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div>W{size.width}</div>
        <div>H{size.height}</div>
        <div>L{position.left}</div>
        <div>T{position.top}</div>
        <div>SW{minimizedSquareWidth}</div>
        <div>SH{minimizedSquareHeight}</div>
      </div>
    </div>
  );
};

export default Resizable;
