import React from "react";
import { getOutgoers, Handle, Position, useEdges, useNodeId, useNodes, useNodesState } from "@xyflow/react";
import { FaPlus } from "react-icons/fa";
import { Gem, Plus } from "lucide-react";

const WeddingNode = ({}) => {
  const edges = useEdges();
  const nodes = useNodes();

  const [_, setNodes] = useNodesState(nodes);

  const nodeId = useNodeId();

  const currentNode = nodes.find((node) => node.id === nodeId);

  const outgoers = getOutgoers(currentNode, nodes, edges);

  console.log(outgoers);
  return (
    <div
      style={{
        width: 150,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d6eaf880",
        border: "1px solid #d6eaf8",
        // borderRadius: "50%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Gem size={16} color="#2e86c1" />
        <p
          style={{
            marginBottom: 0,
          }}
        >
          Married
        </p>

        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            // hide all outgoers;

            const updatedOutgoers = outgoers.map((outgoer) => {
              return {
                ...outgoer,
                hidden: outgoer.hidden ? false : true,
              };
            });

            const updatedNodes = [...nodes, updatedOutgoers];

            setNodes(updatedNodes);
          }}
        >
          <Plus />
        </button> */}
      </div>

      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
};

export default WeddingNode;
