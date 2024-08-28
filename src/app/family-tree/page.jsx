"use client";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import { useState, useEffect } from "react";

import "./App.css";
import { createLinkTemplate, createNodeTemplate } from "../helpers/tree-helper";

function initDiagram(modelData) {
  const diagram = new go.Diagram({
    "undoManager.isEnabled": true,
    "clickCreatingTool.archetypeNodeData": {
      text: "new node",
      color: "lightblue",
    },

    layout: new go.TreeLayout({
      angle: 90,
      nodeSpacing: 20,
      layerSpacing: 50,
      layerStyle: go.TreeLayout.LayerUniform,

      treeStyle: go.TreeStyle.LastParents,
      alternateAngle: 90,
      alternateLayerSpacing: 35,
      alternateAlignment: go.TreeAlignment.BottomRightBus,
      alternateNodeSpacing: 20,
    }),
    "toolManager.hoverDelay": 100,
    linkTemplate: createLinkTemplate(),
    model: new go.TreeModel({
      nodeKeyProperty: "_id",
      nodeDataArray: modelData,
    }),
  });

  diagram.nodeTemplate = createNodeTemplate();

  // Initially center on root:
  diagram.addDiagramListener("InitialLayoutCompleted", () => {
    const root = diagram.findNodeForKey("66cdb9c49f9e60170b886c5a");
    if (!root) return;
    diagram.scale = 0.6;
    diagram.scrollToRect(root.actualBounds);
  });

  return diagram;
}

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/api/members", {
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Tree API response");
        console.log(result.familyTreeData);

        const formattedData = result.familyTreeData.map((node) => ({
          ...node,
          parent: node.parent ? node.parent : "",
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort(); // clean up the request when component unmounts
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <ReactDiagram
          initDiagram={() => initDiagram(data)}
          divClassName="diagram-component"
          nodeDataArray={data}
        />
      )}
    </>
  );
}

export default App;
