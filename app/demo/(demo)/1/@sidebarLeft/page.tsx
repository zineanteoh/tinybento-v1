"use client";
import { useStore } from "@/store/store";
import React from "react";

// Displays all internal states of the bento
const SidebarLeft = () => {
  const { isDropped, droppedIngredients } = useStore();

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        width: "200px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "left",
      }}
    >
      <div>isDropped: {isDropped ? "true" : "false"}</div>
      <div>droppedIngredients: {droppedIngredients}</div>
    </div>
  );
};

export default SidebarLeft;
