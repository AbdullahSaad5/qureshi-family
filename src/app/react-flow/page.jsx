"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ReactFlow, addEdge, ConnectionLineType, Panel, useNodesState, useEdgesState } from "@xyflow/react";
import dagre from "dagre";
import { getAllConnections, getAllEdges } from "./helpers.js";
import ReactFlowTree from "./ReactFlow.jsx";
import "@xyflow/react/dist/style.css";

const LayoutFlow = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api/members");
      const data = await response.json();
      //   const addedNodes = [];
      //   data.forEach((item) => {
      //     if (addedNodes.length < 2) {
      //       if (!item.father) {
      //         item.father = "0";
      //       }
      //       if (!item.mother) {
      //         item.mother = "1";
      //       }
      //       addedNodes.push(item);
      //     }
      //   });

      //   data.push({
      //     _id: "0",
      //     name: "Father",
      //     spouse: ["1"],
      //   });
      //   data.push({
      //     _id: "1",
      //     name: "Mother",
      //     spouse: ["0"],
      //   });

      setData(data);
    };

    fetchData();
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }
  return <ReactFlowTree data={data} />;
};

export default LayoutFlow;
