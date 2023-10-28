"use client";
import DraggableIngredient from "@/components/demo/DraggableIngredient";
import React from "react";

const SidebarRight = () => {
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
      <DraggableIngredient content="1x1" />
      <DraggableIngredient content="1x2" />
      <DraggableIngredient content="2x1" />
      <DraggableIngredient content="2x2" />
      <DraggableIngredient content="1x3" />
      <DraggableIngredient content="3x1" />
    </div>
  );
};

export default SidebarRight;
