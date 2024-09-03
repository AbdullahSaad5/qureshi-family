import React from "react";

const FocusOverlay = ({
  node,
  diagramSize = { width: 1000, height: 1000 },
  screenSize = { width: window.innerWidth, height: window.innerHeight },
}) => {
  console.log("Inside simple focus overlay");
  console.log(node);

  if (!node) return null;

  const { x, y, width, height } = node.actualBounds;
  console.log(`Bounds - x: ${x}, y: ${y}, width: ${width}, height: ${height}`);

  const xRatio = screenSize.width / diagramSize.width;
  const yRatio = screenSize.height / diagramSize.height;

  const screenX = x * xRatio;
  const screenY = y * yRatio;
  const screenWidth = width * xRatio;
  const screenHeight = height * yRatio;

  return (
    <div
      style={{
        position: "absolute",
        left: screenX,
        top: screenY,
        width: screenWidth,
        height: screenHeight,
        border: "2px solid rgba(255,255,0,0.5)",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
};

export default FocusOverlay;
