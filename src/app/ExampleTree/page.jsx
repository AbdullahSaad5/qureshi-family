"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";

const Tree = dynamic(() => import("react-d3-tree"), { ssr: false });

const treeData = {
  _id: "64f61c0e0d0f641e8d93b01f", // Grandfather John's ID
  name: "Grandfather John",
  attributes: { relation: "Grandfather" },
  children: [
    {
      _id: "64f61c0e0d0f641e8d93b020", // Michael's ID
      parentId: "64f61c0e0d0f641e8d93b01f", // Grandfather John's ID
      name: "Michael",
      attributes: { relation: "Father" },
      children: [
        {
          _id: "64f61c0e0d0f641e8d93b040", // Emily's ID
          parentId: "64f61c0e0d0f641e8d93b020", // Michael's ID
          name: "Emily",
          attributes: { relation: "Wife" },
        },
        {
          _id: "64f61c0e0d0f641e8d93b021", // Sarah's ID
          parentId: "64f61c0e0d0f641e8d93b020", // Michael's ID
          name: "Sarah",
          attributes: { relation: "Mother" },
          children: [
            {
              _id: "64f61c0e0d0f641e8d93b022", // Alice's ID
              parentId: "64f61c0e0d0f641e8d93b021", // Sarah's ID
              name: "Alice",
              attributes: { relation: "Child 1" },
              children: [
                {
                  _id: "64f61c0e0d0f641e8d93b023", // Sophia's ID
                  parentId: "64f61c0e0d0f641e8d93b022", // Alice's ID
                  name: "Sophia",
                  attributes: { relation: "Grandchild 1" },
                },
                {
                  _id: "64f61c0e0d0f641e8d93b024", // Mason's ID
                  parentId: "64f61c0e0d0f641e8d93b022", // Alice's ID
                  name: "Mason",
                  attributes: { relation: "Grandchild 2" },
                },
              ],
            },
            {
              _id: "64f61c0e0d0f641e8d93b025", // Bob's ID
              parentId: "64f61c0e0d0f641e8d93b021", // Sarah's ID
              name: "Bob",
              attributes: { relation: "Child 2" },
              children: [
                {
                  _id: "64f61c0e0d0f641e8d93b026", // Ella's ID
                  parentId: "64f61c0e0d0f641e8d93b025", // Bob's ID
                  name: "Ella",
                  attributes: { relation: "Grandchild 3" },
                },
                {
                  _id: "64f61c0e0d0f641e8d93b027", // Lucas's ID
                  parentId: "64f61c0e0d0f641e8d93b025", // Bob's ID
                  name: "Lucas",
                  attributes: { relation: "Grandchild 4" },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      _id: "64f61c0e0d0f641e8d93b030", // Robert's ID
      parentId: "64f61c0e0d0f641e8d93b01f", // Grandfather John's ID
      name: "Robert",
      attributes: { relation: "Uncle" },
      children: [
        {
          _id: "64f61c0e0d0f641e8d93b031", // Laura's ID
          parentId: "64f61c0e0d0f641e8d93b030", // Robert's ID
          name: "Laura",
          attributes: { relation: "Aunt" },
        },
        {
          _id: "64f61c0e0d0f641e8d93b032", // Emily's ID
          parentId: "64f61c0e0d0f641e8d93b031", // Laura's ID
          name: "Emily",
          attributes: { relation: "Child" },
          children: [
            {
              _id: "64f61c0e0d0f641e8d93b033", // Aiden's ID
              parentId: "64f61c0e0d0f641e8d93b032", // Emily's ID
              name: "Aiden",
              attributes: { relation: "Grandchild 1" },
            },
            {
              _id: "64f61c0e0d0f641e8d93b034", // Chloe's ID
              parentId: "64f61c0e0d0f641e8d93b032", // Emily's ID
              name: "Chloe",
              attributes: { relation: "Grandchild 2" },
            },
          ],
        },
      ],
    },
  ],
};

const customNode = {
  shape: "rect",
  shapeProps: {
    width: 120,
    height: 60,
    x: -60,
    y: -30,
    fill: "#fff",
    stroke: "#000",
  },
};

export default function ExampleTree() {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const treeContainerRef = useRef(null);

  useEffect(() => {
    const dimensions = treeContainerRef.current?.getBoundingClientRect();
    if (dimensions) {
      setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height / 4,
      });
    }
  }, []);

  const handleNodeClick = (node) => {
    console.log("Node clicked:", node);
  };

  const handleAddClick = (node) => {
    console.log("Add icon clicked for node:", node);
  };

  const renderCustomNode = ({ nodeDatum }) => {
    const nodeWidth = customNode.shapeProps.width;
    const nodeHeight = customNode.shapeProps.height;

    return (
      <g onClick={() => handleNodeClick(nodeDatum)}>
        <rect {...customNode.shapeProps} />
        <text
          fill="black"
          x="0"
          y="-10"
          textAnchor="middle"
          style={{ fontSize: "10px", fontWeight: "50" }}
        >
          {nodeDatum.attributes.relation}
        </text>
        <text
          fill="black"
          x="0"
          y="10"
          textAnchor="middle"
          style={{ fontSize: "12px", fontWeight: "50" }}
        >
          {nodeDatum.name}
        </text>
        <g transform={`translate(${nodeWidth - 24}, ${nodeHeight - 24})`}>
          <rect
            x="0"
            y="0"
            width={16}
            height={16}
            fill="#007bff"
            stroke="#000"
            strokeWidth="1"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the node click event from firing
              handleAddClick(nodeDatum);
            }}
          />
          <text
            x={8}
            y={12}
            fill="#fff"
            fontSize="12px"
            textAnchor="middle"
            style={{ fontWeight: "bold" }}
          >
            +
          </text>
        </g>
      </g>
    );
  };

  return (
    <div ref={treeContainerRef} style={{ width: "100%", height: "700px" }}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={translate}
        renderCustomNodeElement={renderCustomNode}
        scale={0.5}
      />
    </div>
  );
}
