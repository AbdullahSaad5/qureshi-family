import React from "react";
import { Handle, Position } from "@xyflow/react";
import { FaPlus } from "react-icons/fa";
import { Gem } from "lucide-react";

const WeddingNode = ({}) => {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d6eaf880",
        border: "1px solid #d6eaf8",
        borderRadius: "50%",
      }}
    >
      <div>
        <Gem size={16} color="#2e86c1" />
      </div>

      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
};

export default WeddingNode;
