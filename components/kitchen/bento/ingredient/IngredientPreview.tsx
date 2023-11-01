import React from "react";

const IngredientPreview = ({
  children,
  computedStyles,
}: {
  children: React.ReactNode;
  computedStyles: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        ...computedStyles,
        position: "absolute",
        backgroundColor: "rgba(255, 25, 3, 0.3)",
        border: "1px dashed black",
      }}
    >
      {children}
    </div>
  );
};

export default IngredientPreview;
