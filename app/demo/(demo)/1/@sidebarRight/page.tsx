"use client";
import DraggableIngredient from "@/components/demo-1/DraggableIngredient";
import React from "react";

const page = () => {
  return (
    <div
      style={{
        backgroundColor: "pink",
        width: "200px",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <DraggableIngredient>1x1</DraggableIngredient>
      <DraggableIngredient>1x2</DraggableIngredient>
      <DraggableIngredient>2x1</DraggableIngredient>
      <DraggableIngredient>2x2</DraggableIngredient>
      <DraggableIngredient>1x3</DraggableIngredient>
      <DraggableIngredient>3x1</DraggableIngredient>
    </div>
  );
};

export default page;
