import React, { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import DroppableBentoSquare from "./DroppableBentoSquare";
import DroppedIngredient, { DroppedVariant } from "./Ingredient";
import {
  BentoIngredientType,
  DroppedIngredientType,
} from "@/store/demo1-store";

export interface Dimension {
  width: number;
  height: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

// TODO:
export const CONTAINER_WIDTH = 700;
export const CONTAINER_HEIGHT = 700;

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

  const droppedIngredients = dropped.map(
    (ingredient: BentoIngredientType, index: number) => {
      return (
        <DroppedIngredient
          key={index}
          ingredient={ingredient}
          dimension={dimension}
          variant={ingredient.variant}
        />
      );
    }
  );

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
