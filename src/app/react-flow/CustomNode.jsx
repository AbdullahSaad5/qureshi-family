import React from "react";
import { Handle } from "@xyflow/react";
import { FaPlus } from "react-icons/fa";

const CustomNode = ({ id, data }) => {
  const handleClick = () => {
    console.log(`+ icon clicked on node ${id}`);
  };

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "4px",
        background: "#fff",
        width: "150px", // Ensuring enough space for content
        height: "50px", // Ensuring enough space for content
      }}
    >
      <div>{data.label}</div>
      {/* <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px", // Changed to right from left for bottom-right corner
          cursor: "pointer",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly transparent background to improve visibility
          borderRadius: "50%", // Round button
          padding: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)", // Subtle shadow for better visibility
        }}
        onClick={handleClick}
      >
        <FaPlus size={16} />
      </div> */}
      <Handle type="source" position="left" id="left" />
      <Handle type="source" position="right" id="right" />
      <Handle type="source" position="bottom" id="bottom" />
      <Handle type="target" position="top" id="top" />
    </div>
  );
};

export default CustomNode;
