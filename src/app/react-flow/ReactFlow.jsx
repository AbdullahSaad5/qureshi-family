"use client";

import React, { useCallback } from "react";
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
import { getAllConnections, getAllEdges } from "./helpers";

// Custom Edge Component
const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, style = {}, markerEnd }) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const midpointX = (sourceX + targetX) / 2;
  const midpointY = (sourceY + targetY) / 2;

  console.log("id", id);

  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      <circle cx={midpointX} cy={midpointY} r={5} fill="red" />
      <text x={labelX} y={labelY} fill="black" fontSize={12}>
        Midpoint
      </text>
      <Handle
        type="source"
        position="bottom"
        // id="midpoint"
        id={id}
        style={{ left: midpointX, top: midpointY, background: "#555" }}
      />
    </>
  );
};

const ReactFlowTree = ({ data }) => {
  const initialNodes = getAllConnections(data);
  const initialEdges = getAllEdges(data, initialNodes);

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 172;
  const nodeHeight = 36;

  const edgeTypes = {
    custom: CustomEdge,
  };

  const getLayoutedElements = useCallback(
    (nodes, edges, direction = "TB") => {
      const isHorizontal = direction === "LR";
      dagreGraph.setGraph({ rankdir: direction });

      nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {
          width: node.shape === "diamond" ? 50 : nodeWidth,
          height: node.shape === "diamond" ? 50 : nodeHeight,
        });
      });

      edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
      });

      dagre.layout(dagreGraph);

      const newNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        const newNode = {
          ...node,
          targetPosition: isHorizontal ? "left" : "top",
          sourcePosition: isHorizontal ? "right" : "bottom",
          // We are shifting the dagre node position (anchor=center center) to the top left
          // so it matches the React Flow node anchor point (top left).
          position: {
            x: node.shape === "diamond" ? nodeWithPosition.x - 25 : nodeWithPosition.x - nodeWidth / 4,
            y: node.shape === "diamond" ? nodeWithPosition.y - 25 : nodeWithPosition.y - nodeHeight / 4,
          },
        };

        return newNode;
      });

      return { nodes: newNodes, edges };
    },
    [data]
  );

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)),
    [setEdges]
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setNodes, setEdges, getLayoutedElements]
  );

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        elementsSelectable={true}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Panel position="top-right">
          <button onClick={() => onLayout("TB")}>vertical layout</button>
          <button onClick={() => onLayout("LR")}>horizontal layout</button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default ReactFlowTree;
