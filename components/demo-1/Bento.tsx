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

const Bento = () => {
  const bentoSquares = Array.from({ length: DIMENSION.width }).map((_, y) =>
    Array.from({ length: DIMENSION.height }).map((_, x) => (
      <DroppableBentoSquare
        key={x}
        coordinate={{
          x: x,
          y: y,
        }}
      />
    ))
  );

  return (
    <div
      style={{
        width: 700,
        height: 700,
        display: "grid",
        gridTemplateColumns: `repeat(${DIMENSION.width}, 1fr)`,
        gridTemplateRows: `repeat(${DIMENSION.height}, 1fr)`,
      }}
    >
      {/* The width x height bento squares */}
      {bentoSquares}

      {/* The dropped ingredients */}
    </div>
  );
};

export default Bento;
