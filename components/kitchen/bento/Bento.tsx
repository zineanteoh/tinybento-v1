import React, { useRef } from "react";
import styles from "./Bento.module.css";
import { AnimateFadeDrop } from "@/utils/animations";
import { useStore } from "@/store/kitchen-store/store";
import IngredientDroppable from "./droppable/IngredientDroppable";
import { BentoIngredientType } from "@/utils/interfaces";
import Ingredient from "./ingredient/Ingredient";
import { BENTO_INNER_PADDING } from "@/utils/constants";

const Bento = () => {
  // use ref to allow ingredients to get width + height of bento container
  const bentoRef = useRef<HTMLDivElement>(null);
  const { dimension, bentoIngredients } = useStore();

  const bentoSquares = Array.from({ length: dimension.height }).map((_, y) =>
    Array.from({ length: dimension.width }).map((_, x) => (
      <IngredientDroppable key={x} coordinate={{ x, y }} />
    ))
  );

  const ingredients = (
    <div
      style={{
        position: "absolute",
        top: BENTO_INNER_PADDING,
        left: BENTO_INNER_PADDING,
        width: `calc(100% - ${2 * BENTO_INNER_PADDING}px)`,
        height: `calc(100% - ${2 * BENTO_INNER_PADDING}px)`,
      }}
    >
      {bentoIngredients.map(
        (ingredient: BentoIngredientType, index: number) => {
          return (
            <Ingredient
              key={index}
              ingredient={ingredient}
              variant={ingredient.variant}
              bentoDimension={dimension}
              bentoWidth={
                (bentoRef.current?.clientWidth ?? 0) - 2 * BENTO_INNER_PADDING
              }
              bentoHeight={
                (bentoRef.current?.clientHeight ?? 0) - 2 * BENTO_INNER_PADDING
              }
            />
          );
        }
      )}
    </div>
  );

  return (
    <AnimateFadeDrop>
      <div
        ref={bentoRef}
        className={styles.container + " no-select"}
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: `repeat(${dimension.width}, 1fr)`,
          gridTemplateRows: `repeat(${dimension.height}, 1fr)`,
          padding: 15,
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
