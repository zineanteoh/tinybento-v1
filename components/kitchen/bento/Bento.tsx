import React from "react";
import styles from "./Bento.module.css";
import { AnimateFadeDrop } from "@/utils/animations";
import { useStore } from "@/store/kitchen-store/store";
import IngredientDroppable from "./droppable/IngredientDroppable";
// import { BentoIngredientType } from "@/utils/interfaces";
// import Ingredient from "./ingredient/Ingredient";

const Bento = () => {
  const { dimension, bentoIngredients } = useStore();

  const bentoSquares = Array.from({ length: dimension.height }).map((_, y) =>
    Array.from({ length: dimension.width }).map((_, x) => (
      <IngredientDroppable key={x} coordinate={{ x, y }} />
    ))
  );

  // const ingredients = bentoIngredients.map(
  //   (ingredient: BentoIngredientType, index: number) => {
  //     return (
  //       <Ingredient
  //         key={index}
  //         ingredient={ingredient}
  //         variant={ingredient.variant}
  //         bentoDimension={dimension}
  //         bentoWidth={400}
  //         bentoHeight={400}
  //       />
  //     );
  //   }
  // );

  return (
    <AnimateFadeDrop>
      <div
        className={styles.container + " no-select"}
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: `repeat(${dimension.width}, 1fr)`,
          gridTemplateRows: `repeat(${dimension.height}, 1fr)`,
        }}
      >
        {/* The width x height bento squares */}
        {bentoSquares}

        {/* The ingredients (both dropped and preview) */}
        {/* {ingredients} */}
      </div>
    </AnimateFadeDrop>
  );
};

export default Bento;
