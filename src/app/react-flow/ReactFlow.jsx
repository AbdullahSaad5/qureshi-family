"use client";

import React, { useCallback, useEffect, useLayoutEffect } from "react";
import {
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  getBezierPath,
  Handle,
  useReactFlow,
  Background,
} from "@xyflow/react";
import dagre from "dagre";
import ELK from "elkjs/lib/elk.bundled.js";
import "@xyflow/react/dist/style.css";
import { getAllConnections, getAllEdges } from "./helpers";
import CustomNode from "./CustomNode";
import WeddingNode from "./WeddingNode";
import SpouseEdge from "./SpouseEdge";

const elk = new ELK();

const elkOptions = {
  "elk.algorithm": "layered",
  "elk.animate": true,
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
};

const getLayoutedElements = (nodes, edges, options = {}) => {
  const isHorizontal = false;
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",

      // Hardcode a width and height for elk to use when layouting.
      // width: 150,
      // height: 50,
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

const ReactFlowTree = ({ data, IDs = [] }) => {
  let initialNodes = [];
  let initialEdges = [];

  if (Array.isArray(data) && data.length > 0) {
    initialNodes = getAllConnections(data);
    initialEdges = getAllEdges(data, initialNodes);
  } else {
    console.log("No data available or data is not an array");
  }

  // const dagreGraph = new dagre.graphlib.Graph();
  // dagreGraph.setDefaultEdgeLabel(() => ({}));

  // const nodeWidth = 172;
  // const nodeHeight = 36;

  const nodeTypes = {
    custom: CustomNode,
    wedding: WeddingNode,
    spouse: SpouseEdge,
  };

  // const getLayoutedElements = useCallback(
  //   (nodes, edges, direction = "TB") => {
  //     const isHorizontal = direction === "LR";
  //     dagreGraph.setGraph({ rankdir: direction });

  //     nodes.forEach((node) => {
  //       dagreGraph.setNode(node.id, {
  //         width: node.shape === "diamond" ? 50 : nodeWidth,
  //         height: node.shape === "diamond" ? 50 : nodeHeight,
  //       });
  //     });

  //     edges.forEach((edge) => {
  //       dagreGraph.setEdge(edge.source, edge.target);
  //     });

  //     dagre.layout(dagreGraph);

  //     const newNodes = nodes.map((node) => {
  //       const nodeWithPosition = dagreGraph.node(node.id);
  //       const newNode = {
  //         ...node,
  //         targetPosition: isHorizontal ? "left" : "top",
  //         sourcePosition: isHorizontal ? "right" : "bottom",
  //         // We are shifting the dagre node position (anchor=center center) to the top left
  //         // so it matches the React Flow node anchor point (top left).
  //         position: {
  //           x: nodeWithPosition.x - nodeWidth / 4,
  //           y: nodeWithPosition.y - nodeHeight / 4,
  //         },
  //       };

  //       return newNode;
  //     });

  //     return { nodes: newNodes, edges };
  //   },
  //   [dagreGraph]
  // );

  // const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);

  // const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)),
  //   [setEdges]
  // );
  // const onLayout = useCallback(
  //   (direction) => {
  //     const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);

  //     setNodes([...layoutedNodes]);
  //     setEdges([...layoutedEdges]);
  //   },
  //   [nodes, edges, setNodes, setEdges, getLayoutedElements]
  // );

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onConnect = useCallback(
    (params) => {
      console.log("onConnect params", params);

      const newNode = {
        id: `edge-${params.source}-${params.target}`,
        position: {
          x: 0,
          y: 0,
        },
        type: "spouse",
        data: {
          source: params.source,
          target: params.target,
        },
        draggable: false,
        selectable: false,
      };
      setNodes((nds) => [...nds, newNode]);
      setEdges((els) => addEdge(params, els));
    },
    [setEdges, setNodes]
  );
  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { "elk.direction": direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;

      getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        window.requestAnimationFrame(() => fitView());
      });
    },
    [nodes, edges]
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: "DOWN", useInitialNodes: true });
  }, []);

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
        // edgeTypes={{
        //   spouse: SpouseEdge,
        // }}
        nodeTypes={nodeTypes}
        elementsSelectable={true}
        onNodeClick={onNodeClick}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        connectionMode="loose"
      >
        <Background />
        {/* <Panel position="top-right">
            <button onClick={() => onLayout("TB")}>vertical layout</button>
            <button onClick={() => onLayout("LR")}>horizontal layout</button>
          </Panel> */}
      </ReactFlow>
    </div>
  );
};

export default ReactFlowTree;
