import React from "react";
import { AnimateRightLeft } from "@/utils/animations";
import ActionContainer from "../ActionContainer";

const ShareBento = () => {
  return (
    <AnimateRightLeft>
      <ActionContainer>
        <div>Share Bento here!</div>
      </ActionContainer>
    </AnimateRightLeft>
  );
};

export default ShareBento;
