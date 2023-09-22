import React, { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import DroppableBentoSquare from "./DroppableBentoSquare";

export interface Dimension {
  width: number;
  height: number;
}

export interface Ingredient {
  id: string;
}

export interface Coordinates {
  x: number;
  y: number;
}

const DIMENSION: Dimension = {
  width: 4,
  height: 4,
};

// TODO:
const CONTAINER_WIDTH = 700;
const CONTAINER_HEIGHT = 700;

const Bento = () => {
  const { dropped } = useStore();

  const bentoSquares = Array.from({ length: DIMENSION.height }).map((_, y) =>
    Array.from({ length: DIMENSION.width }).map((_, x) => (
      <DroppableBentoSquare
        key={x}
        coordinate={{
          x: x,
          y: y,
        }}
      />
    ))
  );

  const droppedIngredients = dropped.map((ingredient, i) => {
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          width: CONTAINER_WIDTH / DIMENSION.width,
          height: CONTAINER_HEIGHT / DIMENSION.height,
          boxSizing: "border-box",
          left: (ingredient.coordinate.x * CONTAINER_WIDTH) / DIMENSION.width,
          top: (ingredient.coordinate.y * CONTAINER_HEIGHT) / DIMENSION.height,
          backgroundColor: "rgba(91, 255, 3, 0.235)",
        }}
      >
        {ingredient.id}
      </div>
    );
  });

  return (
    <div
      style={{
        position: "relative",
        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
        display: "grid",
        gridTemplateColumns: `repeat(${DIMENSION.width}, 1fr)`,
        gridTemplateRows: `repeat(${DIMENSION.height}, 1fr)`,
      }}
    >
      {/* The width x height bento squares */}
      {bentoSquares}

      {/* The dropped ingredients */}
      {droppedIngredients}
    </div>
  );
};

export default Bento;
