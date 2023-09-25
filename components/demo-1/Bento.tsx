import React, { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import DroppableBentoSquare from "./DroppableBentoSquare";

export interface Dimension {
  width: number;
  height: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

// TODO:
const CONTAINER_WIDTH = 700;
const CONTAINER_HEIGHT = 700;

const Bento = () => {
  const { dimension, dropped } = useStore();

  const bentoSquares = Array.from({ length: dimension.height }).map((_, y) =>
    Array.from({ length: dimension.width }).map((_, x) => (
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
          width: (CONTAINER_WIDTH / dimension.width) * ingredient.width - 20,
          height:
            (CONTAINER_HEIGHT / dimension.height) * ingredient.height - 20,
          boxSizing: "border-box",
          left:
            (ingredient.coordinate.x * CONTAINER_WIDTH) / dimension.width + 10,
          top:
            (ingredient.coordinate.y * CONTAINER_HEIGHT) / dimension.height +
            10,
          backgroundColor: "rgba(91, 255, 3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {ingredient.height}x{ingredient.width}
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
        gridTemplateColumns: `repeat(${dimension.width}, 1fr)`,
        gridTemplateRows: `repeat(${dimension.height}, 1fr)`,
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
