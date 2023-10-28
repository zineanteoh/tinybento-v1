import React from "react";
import { AnimateRightLeft } from "@/utils/animations";
import ActionContainer from "../ActionContainer";

const Hierarchy = () => {
  return (
    <AnimateRightLeft>
      <ActionContainer>
        <div>Hierarchy goes here</div>
      </ActionContainer>
    </AnimateRightLeft>
  );
};

export default Hierarchy;
