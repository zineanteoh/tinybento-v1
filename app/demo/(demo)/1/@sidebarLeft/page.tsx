"use client";
import { useStore } from "@/store/store";
import React from "react";

// Displays all internal states of the bento
const SidebarLeft = () => {
  const { dropped, dragging } = useStore();

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
      <div>dragging: {dragging}</div>
      <div>
        dropped:
        {dropped.map((ingredient, i) => {
          const { x, y } = ingredient.coordinate;

          return (
            <div key={i}>
              {/* ({x}, {y}) {ingredient.id} */}
              {JSON.stringify(ingredient)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarLeft;
