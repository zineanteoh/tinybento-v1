"use client";
import React, { useState } from "react";
import styles from "./Resizable.module.css";
import {
  CSSPosition,
  Dimension,
  DirectionMultiplier,
  ResizableProps,
  ResizeDirection,
  ResizeType,
} from "@/utils/interfaces";
import {
  computeNewPositionForExpand,
  computeNewPositionForShrink,
  computeNewSizeForExpand,
  computeNewSizeForShrink,
  computeValidSquaresForShrink,
  computeResizeType,
  isHorizontal,
  ternary,
} from "@/utils/helper";

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
  const [size, setSize] = useState<Dimension>({
    width: childWidth,
    height: childHeight,
  });
  // keep track of the position (in px) of the component relative to the parent
  const [position, setPosition] = useState<CSSPosition>({
    top: coordinate.y * squareHeight,
    left: coordinate.x * squareWidth,
  });
  // store the minimized size of 1x1 square
  const minimizedSquare: Dimension = {
    width: squareWidth - 2 * padding,
    height: squareHeight - 2 * padding,
  };

  // create function to prevent default (needed for better UX)
  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  // handles resizing from any 4 borders
  const handleBorderPointerDown = (
    e: React.MouseEvent<HTMLDivElement>,
    direction: ResizeDirection
  ) => {
    onResizeStartCallback({
      coordinateOfObject: coordinate,
      directionOfResize: direction,
    });

    // declare a bunch of variables
    const startSize = size;
    const startPosition = position;
    const startCoord = ternary(isHorizontal(direction), e.clientX, e.clientY);
    let previousSquaresMoved = 0; // used to prevent unnecessary calls to shouldResizeCallback
    let previousValidSquaresMoved = 0; // used to pass to onResizeEndCallback

    // create function to be called when pointer move
    const onPointerMove = (e: MouseEvent) => {
      // declare a bunch of variables
      const dMouse =
        ternary(isHorizontal(direction), e.clientX, e.clientY) - startCoord;
      const squareLength = ternary(
        isHorizontal(direction),
        squareWidth,
        squareHeight
      );
      const squaresMoved =
        Math.round(dMouse / squareLength) * DirectionMultiplier[direction];
      const resizeType = computeResizeType(squaresMoved);

      // prevent unnecessary calls to shouldResizeCallback
      if (previousSquaresMoved === squaresMoved) return;

      // an abstract function to handle actions depending on direction
      const commonActions = (
        dim: "width" | "height",
        pos: "top" | "left"
      ): number => {
        const relativeDistanceMoved = squaresMoved * squareLength;
        const newSize = startSize[dim] + relativeDistanceMoved;
        const newPosition = startPosition[pos] - relativeDistanceMoved;

        if (squaresMoved === 0) {
          // 1. neither expand nor shrink. should revert to original size and position
          setSize(startSize);
          setPosition(startPosition);
          return squaresMoved;
        } else if (resizeType === ResizeType.EXPAND) {
          // 2. expand. only resize if resizeCallback allows it
          if (shouldResizeCallback({ squaresMoved })) {
            setSize(computeNewSizeForExpand(direction, startSize, newSize));
            setPosition(
              computeNewPositionForExpand(direction, startPosition, newPosition)
            );
            return squaresMoved;
          }
        } else if (resizeType === ResizeType.SHRINK) {
          // 3. shrink to the smallest possible size
          setSize(
            computeNewSizeForShrink(
              direction,
              startSize,
              newSize,
              minimizedSquare,
              squareLength
            )
          );
          setPosition(
            computeNewPositionForShrink(
              direction,
              startPosition,
              newPosition,
              startSize,
              minimizedSquare
            )
          );

          return computeValidSquaresForShrink(
            squaresMoved,
            minimizedSquare,
            squareLength,
            direction
          );
        } else {
          // throw error
          console.error("Should not reach here!");
        }

        // return original previousSquaresMoved since all were not valid
        return previousValidSquaresMoved;
      };

      // call commonActions depending on direction
      if (isHorizontal(direction)) {
        previousValidSquaresMoved = commonActions("width", "left");
      } else {
        previousValidSquaresMoved = commonActions("height", "top");
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

  // handles resizing from the left border
  const handleLeftBorderPointerDown = (e: React.MouseEvent<HTMLDivElement>) =>
    handleBorderPointerDown(e, ResizeDirection.LEFT);
  // handles resizing from the top border
  const handleTopBorderPointerDown = (e: React.MouseEvent<HTMLDivElement>) =>
    handleBorderPointerDown(e, ResizeDirection.TOP);
  // handles resizing from the right border
  const handleRightBorderPointerDown = (e: React.MouseEvent<HTMLDivElement>) =>
    handleBorderPointerDown(e, ResizeDirection.RIGHT);
  // handles resizing from the bottom border
  const handleBottomBorderPointerDown = (e: React.MouseEvent<HTMLDivElement>) =>
    handleBorderPointerDown(e, ResizeDirection.BOTTOM);

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
        <div>SW{minimizedSquare.width}</div>
        <div>SH{minimizedSquare.height}</div>
      </div>
    </div>
  );
};

export default Resizable;
