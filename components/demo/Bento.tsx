import React from "react";
import { useStore } from "@/store/store";
import DroppableBentoSquare from "./DroppableBentoSquare";
import Ingredient from "./Ingredient";
import { BentoIngredientType } from "@/utils/interfaces";

const BENTO_WIDTH = 700;
const BENTO_HEIGHT = 700;

/**
 * A bento is a container that holds ingredients.
 *
 * It first renders a grid of DroppableBentoSquare(s).
 * Then, it renders the ingredients (positioned absolutely) over it.
 *
 * e.g. a dimension 4x4 bento:
 *
 *        CONTAINER_WIDTH
 *            (in px)
 *       *---------------*
 *       |   |   |   |   |
 *       |---+---+---+---|
 *       |   |   |   |   |
 *       |---+---+---+---| CONTAINER_HEIGHT
 *       |   |   |   |   |     (in px)
 *       |---+---+---+---|
 *       |   |   |   |   |
 *       *---------------*
 *
 */
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
          variant={ingredient.variant}
          bentoDimension={dimension}
          bentoWidth={BENTO_WIDTH}
          bentoHeight={BENTO_HEIGHT}
        />
      );
    }
  );

  return (
    <div
      className="no-select"
      style={{
        position: "relative",
        width: BENTO_WIDTH,
        height: BENTO_HEIGHT,
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
