"use client";
import { useStore } from "@/store/demo-store/store";
import React from "react";

// Displays all internal states of the bento
const SidebarLeft = () => {
  const {
    dimension,
    bentoIngredients,
    bentoIngredients2D,
    dragging,
    isResizing,
    coordinateOfObject,
    directionOfResize,
  } = useStore();

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        width: "200px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        paddingLeft: "10px",
        paddingTop: "25px",
        gap: "10px",
      }}
    >
      <div>
        dimension: {dimension.width}x{dimension.height}
      </div>

      <div>
        dragging: {dragging ? `${dragging.width}x${dragging.height}` : ""}
      </div>

      <div>
        bentoIngredients2D:
        <div>
          {/* row and cols of bentoIngredients2d */}
          {bentoIngredients2D.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                flexDirection: "row",
              }}
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

      <div>isResizing: {isResizing ? "true" : "false"}</div>

      <div>
        coordinateOfObject:{" "}
        {coordinateOfObject
          ? `(${coordinateOfObject.x},${coordinateOfObject.y})`
          : ""}
      </div>

      <div>directionOfResize: {directionOfResize}</div>
    </div>
  );
};

export default SidebarLeft;
