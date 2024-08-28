// components/OrgChart.js
"use client";
import * as go from "gojs";
import { useEffect, useRef } from "react";

const OrgChart = ({ nodeData }) => {
  const diagramRef = useRef(null);

  useEffect(() => {
    let myDiagram;

    const $ = go.GraphObject.make;

    myDiagram = $(go.Diagram, diagramRef.current, {
      initialContentAlignment: go.Spot.Center, // center the content
      "undoManager.isEnabled": true, // enable undo & redo
    });

    // Define the Node template
    myDiagram.nodeTemplate = $(
      go.Node,
      "Auto",
      $(
        go.Shape,
        "RoundedRectangle",
        { strokeWidth: 0 },
        new go.Binding("fill", "dept", (dept) => {
          switch (dept) {
            case "Management":
              return "#6b7280";
            case "Sales":
              return "#fbbf24";
            case "Production":
              return "#34d399";
            case "Marketing":
              return "#f472b6";
            case "Engineering":
              return "#60a5fa";
            default:
              return "#d1d5db";
          }
        })
      ),
      $(
        go.Panel,
        "Horizontal",
        $(
          go.Picture,
          { margin: 10, width: 50, height: 50 },
          new go.Binding("source", "pic")
        ),
        $(
          go.Panel,
          "Table",
          $(
            go.TextBlock,
            { row: 0, column: 0, margin: 5, font: "bold 12pt sans-serif" },
            new go.Binding("text", "name")
          ),
          $(
            go.TextBlock,
            { row: 1, column: 0, margin: 5 },
            new go.Binding("text", "title")
          ),
          $(
            go.TextBlock,
            { row: 2, column: 0, margin: 5 },
            new go.Binding("text", "email")
          ),
          $(
            go.TextBlock,
            { row: 3, column: 0, margin: 5 },
            new go.Binding("text", "phone")
          )
        )
      )
    );

    // Define the Link template
    myDiagram.linkTemplate = $(
      go.Link,
      $(go.Shape),
      $(go.Shape, { toArrow: "OpenTriangle" })
    );

    // Set the model
    myDiagram.model = new go.TreeModel(nodeData);

    return () => {};
  }, [nodeData]);

  return <div ref={diagramRef} className="w-full h-full" />;
};

export default OrgChart;
