import React, { useEffect, useRef, useState } from "react";
import styles from "./Bento.module.css";
import { useStore } from "@/store/kitchen-store/store";
import IngredientDroppable from "./droppable/IngredientDroppable";
import BentoIngredient from "./ingredient/BentoIngredient";
import { AnimateFadeDrop } from "@/utils/animations";
import { BentoIngredientType } from "@/utils/interfaces";
import { BENTO_INNER_PADDING } from "@/utils/constants";

const Bento = () => {
  // use ref to allow ingredients to get width + height of bento container
  const bentoRef = useRef<HTMLDivElement>(null);
  const { dimension, bentoIngredients } = useStore();
  // use a dummy state to force rerender when window resizes
  const [_, setRandom] = useState(false);
  const bentoWidth = bentoRef.current?.clientWidth ?? 0;
  const bentoHeight = bentoRef.current?.clientHeight ?? 0;

  // update windowSize when window resizes to recompute ingredient dimensions
  useEffect(() => {
    // trigger rerender
    const handleWindowResize = () => setRandom((prev) => !prev);
    // add event listener
    window.addEventListener("resize", handleWindowResize);
    // remove event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

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
            <BentoIngredient
              key={index}
              ingredient={ingredient}
              variant={ingredient.variant}
              bentoDimension={dimension}
              bentoWidth={bentoWidth - 2 * BENTO_INNER_PADDING}
              bentoHeight={bentoHeight - 2 * BENTO_INNER_PADDING}
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
          display: "grid",
          gridTemplateColumns: `repeat(${dimension.width}, 1fr)`,
          gridTemplateRows: `repeat(${dimension.height}, 1fr)`,
          padding: BENTO_INNER_PADDING,
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
