import React, { memo, FC, CSSProperties, useEffect, useCallback } from "react";
import { Handle, NodeProps, Position, ReactFlowStore, useStore, getBezierPath, useReactFlow } from "@xyflow/react";

const EDGE_NODE_WIDTH = 80;
const EDGE_NODE_HEIGHT = 20;

const contentStyle = {
  fontSize: 10,
  color: "#888899",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  border: "1px solid #555",
  borderRadius: 15,
  width: EDGE_NODE_WIDTH,
  height: EDGE_NODE_HEIGHT,
};

const SpouseEdge = ({ id, data }) => {
  const { setNodes } = useReactFlow();
  const [edgeCenterX, edgeCenterY] = useStore(
    useCallback(
      (s) => {

        // const sourceNode = s.nodeInternals.get(data.source);
        // const targetNode = s.nodeInternals.get(data.target);

        const [_, centerX, centerY] = getBezierPath({
          sourceX: sourceNode.position.x + sourceNode.width / 2,
          sourceY: sourceNode.position.y,
          targetX: targetNode.position.x + targetNode.width / 2,
          targetY: targetNode.position.y,
        });

        return [centerX, centerY];
      },
      [data.source, data.target]
    )
  );

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.position = {
            x: edgeCenterX - EDGE_NODE_WIDTH / 2,
            y: edgeCenterY,
          };
        }

        return node;
      })
    );
  }, [id, edgeCenterX, edgeCenterY, setNodes]);

  return (
    <>
      <div style={contentStyle}>edge node</div>
      <Handle type="source" position={Position.Top} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="source" position={Position.Bottom} id="c" />
      <Handle type="source" position={Position.Left} id="d" />
    </>
  );
};

export default memo(SpouseEdge);
