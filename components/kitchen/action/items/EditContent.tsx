import React from "react";
import { AnimateRightLeft } from "@/utils/animations";
import ActionContainer from "../ActionContainer";

const EditContent = () => {
  return (
    <AnimateRightLeft>
      <ActionContainer style={{ width: "100%" }}>
        <div>Edit Content here</div>
      </ActionContainer>
    </AnimateRightLeft>
  );
};

export default EditContent;
