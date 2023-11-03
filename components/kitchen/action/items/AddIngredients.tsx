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
import AddIngredientDraggable from "@/components/kitchen/bento/draggable/AddIngredientDraggable";

interface IngredientIdToIconType {
  // TODO: map from an enum to React.ReactNode
  [key: string]: React.ReactNode;
}

export const ingredientsIdIconMap: IngredientIdToIconType = {
  "1x1": IconIngredient1x1,
  "2x2": IconIngredient2x2,
  "1x2": IconIngredient1x2,
  "2x3": IconIngredient2x3,
  "1x3": IconIngredient1x3,
  "2x4": IconIngredient2x4,
  "1x4": IconIngredient1x4,
  "3x3": IconIngredient3x3,
};

const AddIngredients = () => {
  return (
    <AnimateRightLeft>
      <ActionContainer>
        <div className={styles.container}>
          {Object.entries(ingredientsIdIconMap).map(([id, icon]) => (
            <div className={styles.miniContainer} key={id}>
              <AddIngredientDraggable key={id} id={id}>
                {icon}
              </AddIngredientDraggable>
            </div>
          ))}
        </div>
      </ActionContainer>
    </AnimateRightLeft>
  );
};

export default AddIngredients;
