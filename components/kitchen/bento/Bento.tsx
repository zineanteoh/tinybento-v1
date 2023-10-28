import React from "react";
import styles from "./Bento.module.css";
import { AnimateFadeDrop } from "@/utils/animations";
import { BentoIngredientType } from "@/utils/interfaces";
import DroppableBentoSquare from "./droppable/IngredientDroppable";
import Ingredient from "./ingredient/Ingredient";
import { useStore } from "@/kitchen-store/kitchen-store";

const BENTO_WIDTH = 500;
const BENTO_HEIGHT = 500;

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
  const { dimension, bentoIngredientList } = useStore();

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

  const ingredients = bentoIngredientList.map(
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
    <AnimateFadeDrop>
      <div
        className={styles.container + " no-select"}
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
    </AnimateFadeDrop>
  );
};

export default Bento;
