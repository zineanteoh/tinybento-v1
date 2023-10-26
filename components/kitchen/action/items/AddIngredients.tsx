import React from "react";
import { AnimateRightLeft } from "@/utils/animations";
import ActionContainer from "../ActionContainer";

const AddIngredients = () => {
  return (
    <AnimateRightLeft>
      <ActionContainer>
        <div>Woohoo, Add Ingredients here</div>
      </ActionContainer>
    </AnimateRightLeft>
  );
};

export default AddIngredients;
