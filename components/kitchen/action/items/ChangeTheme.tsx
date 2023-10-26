import React from "react";
import { AnimateRightLeft } from "@/utils/animations";
import ActionContainer from "../ActionContainer";

const ChangeTheme = () => {
  return (
    <AnimateRightLeft>
      <ActionContainer>
        <div>Change Theme here!</div>
      </ActionContainer>
    </AnimateRightLeft>
  );
};

export default ChangeTheme;
