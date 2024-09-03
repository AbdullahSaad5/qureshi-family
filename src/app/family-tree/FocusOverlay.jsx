// FocusOverlay.js
import React from "react";

const FocusOverlay = ({ node }) => {
  if (!node) return null;

  const { x, y, width, height } = node.actualBounds;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        border: "2px solid rgba(255,255,0,0.5)",
        pointerEvents: "none", 
        zIndex: 10, 
      }}
    />
  );
};

export default FocusOverlay;
