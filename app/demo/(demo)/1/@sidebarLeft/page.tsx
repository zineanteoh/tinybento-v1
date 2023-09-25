"use client";
import { useStore } from "@/store/store";
import React from "react";

// Displays all internal states of the bento
const SidebarLeft = () => {
  const { dropped, dropped2D, dragging } = useStore();

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
      }}
    >
      <div>
        dragging: {dragging ? `${dragging.width}x${dragging.height}` : ""}
      </div>
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
      <div>
        dropped2D:
        {JSON.stringify(
          dropped2D.map((row) =>
            row.map((col) => (col ? `${col.height}x${col.width}` : null))
          )
        )}
      </div>
    </div>
  );
};

export default SidebarLeft;
