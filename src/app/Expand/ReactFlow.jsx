"use client";

import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  getBezierPath,
  Handle,
} from "@xyflow/react";
import dagre from "dagre";
import "@xyflow/react/dist/style.css";
import {
  getAllConnections,
  getAllEdges,
  calculateLevels,
  calculateX,
} from "./helpers";

const ReactFlowTree = ({ data, IDs = [] }) => {
  let initialNodes = [];
  let initialEdges = [];

  if (Array.isArray(data) && data.length > 0) {
    initialNodes = getAllConnections(data);
    initialEdges = getAllEdges(data, initialNodes);
  } else {
    console.log("No data available or data is not an array");
  }

  const nodeWidth = 200;
  const nodeHeight = 50;
  const nodeGap = 30;

  const levels = calculateLevels(data, nodeHeight, nodeGap);

  const X = calculateX(nodeWidth, levels);
  console.log("X", X);

  const getLayoutedElements = useCallback((nodes, edges, direction = "TB") => {
    const isHorizontal = direction === "LR";

    const newNodes = nodes.map((node, index) => {
      const { X, Y } = node;

      console.log("Node positions inside node function");

      console.log(X);
      console.log(Y);

      const newNode = {
        ...node,
        targetPosition: isHorizontal ? "left" : "top",
        sourcePosition: isHorizontal ? "right" : "bottom",
        width: nodeWidth,
        height: nodeHeight,
        position: {
          x: parseInt(X) || 0,
          y: parseInt(Y) || 0,
        },
      };

      return newNode;
    });

    return { nodes: newNodes, edges };
  }, []);

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    X,
    initialEdges
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    [setEdges]
  );

  const onNodeClick = (event, node) => {
    console.log(`Node clicked:`);
    console.log(node);
  };

  useEffect(() => {
    if (IDs.length > 0) {
      console.log("Selected IDs");
      console.log(IDs);
    }
  }, [IDs]);

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        elementsSelectable={true}
        onNodeClick={onNodeClick}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      ></ReactFlow>
    </div>
  );
};

export default ReactFlowTree;
