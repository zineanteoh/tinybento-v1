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

interface IngredientIconType {
  id: string;
  icon: React.ReactNode;
}

const ingredients: IngredientIconType[] = [
  {
    id: "1x1",
    // icon: IconIngredient1x1,
    icon: <div>1x1</div>,
  },
  {
    id: "2x2",
    // icon: IconIngredient2x2,
    icon: <div>2x2</div>,
  },
  {
    id: "1x2",
    // icon: IconIngredient1x2,
    icon: <div>1x2</div>,
  },
  {
    id: "2x3",
    // icon: IconIngredient2x3,
    icon: <div>2x3</div>,
  },
  {
    id: "1x3",
    // icon: IconIngredient1x3,
    icon: <div>1x3</div>,
  },
  {
    id: "2x4",
    // icon: IconIngredient2x4,
    icon: <div>2x4</div>,
  },
  {
    id: "1x4",
    // icon: IconIngredient1x4,
    icon: <div>1x4</div>,
  },
  {
    id: "3x3",
    // icon: IconIngredient3x3,
    icon: <div>3x3</div>,
  },
];

const AddIngredients = () => {
  return (
    <AnimateRightLeft>
      <ActionContainer>
        <div className={styles.container}>
          {ingredients.map((ingredient) => (
            <div className={styles.miniContainer} key={ingredient.id}>
              <AddIngredientDraggable key={ingredient.id} id={ingredient.id}>
                {ingredient.id}
              </AddIngredientDraggable>
            </div>
          ))}
        </div>
      </ActionContainer>
    </AnimateRightLeft>
  );
};

export default AddIngredients;
