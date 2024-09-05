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
      }}
    >
      <div>{data.label}</div>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <FaPlus size={16} />
      </div>
      <Handle type="target" position="left" />
      <Handle type="source" position="right" />
    </div>
  );
};

export default CustomNode;
