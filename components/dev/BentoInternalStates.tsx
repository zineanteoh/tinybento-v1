import { useStore } from "@/store/kitchen-store/store";
import React from "react";

const BentoInternalStates = () => {
  const { dimension, bentoIngredients, bentoIngredientsGrid, dragging } =
    useStore();

  return (
    <div
      style={{
        position: "absolute",
        width: "200px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        right: "0",
        paddingRight: "10px",
        paddingTop: "25px",
        gap: "10px",
        wordWrap: "break-word",
        pointerEvents: "none",
      }}
    >
      <div>
        dimension: {dimension.width}x{dimension.height}
      </div>

      <div>dragging: {dragging ? JSON.stringify(dragging) : ""}</div>

      <div>
        bentoIngredientsGrid:
        <div>
          {/* row and cols of bentoIngredientsGrid */}
          {bentoIngredientsGrid.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{ display: "flex", flexDirection: "row" }}
            >
              {row.map((col, colIndex) => (
                <span key={colIndex}>
                  {col ? `[${col.height}x${col.width}]` : <div>[null]</div>}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div>
        bentoIngredients:
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {bentoIngredients
            .map((ingredient) => {
              const { width, height } = ingredient;
              const { x, y } = ingredient.coordinate;
              const variant = ingredient.variant;
              return `${height}x${width}, (${x},${y}), ${variant}`;
            })
            .map((data, index) => {
              return (
                <span key={index}>
                  {index}: {data}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BentoInternalStates;
