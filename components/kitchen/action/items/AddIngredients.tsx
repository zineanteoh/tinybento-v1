import React from "react";
import styles from "./AddIngredients.module.css";
import { AnimateRightLeft } from "@/utils/animations";
import ActionContainer from "../ActionContainer";
import {
  IconIngredient1x1,
  IconIngredient1x2,
  IconIngredient1x3,
  IconIngredient1x4,
  IconIngredient2x2,
  IconIngredient2x3,
  IconIngredient2x4,
  IconIngredient3x3,
} from "@/utils/iconLibrary";
import DraggableIngredient from "@/components/demo/DraggableIngredient";
import IngredientDraggable from "../../bento/draggable/IngredientDraggable";

const ingredients = [
  {
    name: "1x1",
    icon: IconIngredient1x1,
  },
  {
    name: "2x2",
    icon: IconIngredient2x2,
  },
  {
    name: "1x2",
    icon: IconIngredient1x2,
  },
  {
    name: "2x3",
    icon: IconIngredient2x3,
  },
  {
    name: "1x3",
    icon: IconIngredient1x3,
  },
  {
    name: "2x4",
    icon: IconIngredient2x4,
  },
  {
    name: "1x4",
    icon: IconIngredient1x4,
  },
  {
    name: "3x3",
    icon: IconIngredient3x3,
  },
];

const AddIngredients = () => {
  return (
    <AnimateRightLeft>
      <ActionContainer>
        <div className={styles.container}>
          {ingredients.map((ingredient, index) => (
            <div className={styles.miniContainer}>
              <IngredientDraggable
                key={ingredient.name}
                uniqueId={ingredient.name}
              >
                <div>{ingredient.icon}</div>
              </IngredientDraggable>
            </div>
          ))}
        </div>
      </ActionContainer>
    </AnimateRightLeft>
  );
};

export default AddIngredients;
