import React from "react";
import { useStore } from "@/store/store";
import DroppableBentoSquare from "./DroppableBentoSquare";
import Ingredient from "./Ingredient";
import { BentoIngredientType } from "@/store/bentoDataSlice";

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
  const { dimension, bentoIngredients } = useStore();

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

  const ingredients = bentoIngredients.map(
    (ingredient: BentoIngredientType, index: number) => {
      return (
        <Ingredient
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
      className="no-select"
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

      {/* The ingredients (both dropped and preview) */}
      {ingredients}
    </div>
  );
};

export default Bento;
