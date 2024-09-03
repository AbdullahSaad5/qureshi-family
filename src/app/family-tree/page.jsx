"use client";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import FocusOverlay from "./FocusOverlay";

import "./App.css";
import { createLinkTemplate, createNodeTemplate } from "../helpers/tree-helper";

let handleNodeClick = () => {};

const prepareGraphData = (nodes) => {
  const linkDataArray = [];
  const nodeMap = new Map(nodes.map((node) => [node._id, node]));

  const findAncestors = (nodeId, ancestors = new Set()) => {
    const node = nodeMap.get(nodeId);
    if (!node || !node.parents) return ancestors;
    node.parents.forEach((parentId) => {
      ancestors.add(parentId);
      findAncestors(parentId, ancestors);
    });
    return ancestors;
  };

  nodes.sort((a, b) => {
    const aAncestors = findAncestors(a._id);
    const bAncestors = findAncestors(b._id);

    if (aAncestors.has(b._id)) return 1;
    if (bAncestors.has(a._id)) return -1;
    return 0;
  });

  // Add a unique key to each link
  nodes.forEach((node) => {
    if (Array.isArray(node.parents) && node.parents.length > 0) {
      node.parents.forEach((parentId) => {
        linkDataArray.push({
          from: parentId,
          to: node._id,
          key: `${parentId}-${node._id}`, // Create a unique key for each link
        });
      });
    }
  });

  return {
    nodeDataArray: nodes,
    linkDataArray,
  };
};

function initDiagram(modelData = [], linkDataArray = []) {
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
    model: new go.GraphLinksModel({
      nodeKeyProperty: "_id",
      linkKeyProperty: "66d6f0d3c827f79acedc045e",
      nodeDataArray: modelData,
      linkDataArray: linkDataArray,
    }),
  });

  diagram.nodeTemplate = createNodeTemplate(handleNodeClick);

  diagram.addDiagramListener("InitialLayoutCompleted", () => {
    const root = diagram.findNodeForKey(modelData[0]?._id);
    if (!root) return;
    diagram.scale = 0.6;
    diagram.scrollToRect(root.actualBounds);
  });

  return diagram;
}

// function initDiagram(modelData = []) {
//   const diagram = new go.Diagram({
//     "undoManager.isEnabled": true,
//     "clickCreatingTool.archetypeNodeData": {
//       text: "new node",
//       color: "lightblue",
//     },
//     layout: new go.TreeLayout({
//       angle: 90,
//       nodeSpacing: 20,
//       layerSpacing: 50,
//       layerStyle: go.TreeLayout.LayerUniform,
//       treeStyle: go.TreeStyle.LastParents,
//       alternateAngle: 90,
//       alternateLayerSpacing: 35,
//       alternateAlignment: go.TreeAlignment.BottomRightBus,
//       alternateNodeSpacing: 20,
//     }),
//     "toolManager.hoverDelay": 100,
//     linkTemplate: createLinkTemplate(),
//     model: new go.TreeModel({
//       nodeKeyProperty: "_id",
//       nodeDataArray: modelData,
//     }),
//   });

//   diagram.nodeTemplate = createNodeTemplate(handleNodeClick);

//   // Initially center on root:
//   diagram.addDiagramListener("InitialLayoutCompleted", () => {
//     // Find a root node or default to the first one
//     const root = diagram.findNodeForKey(modelData[0]?._id);
//     if (!root) return;
//     diagram.scale = 0.6;
//     diagram.scrollToRect(root.actualBounds);
//   });

//   return diagram;
// }

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isButtonloading, setIsButtonLoading] = useState(false);
  const [sameParentIDs, setSameParentIDs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [linkData, setLinkData] = useState([]);

  const [highlightedNode, setHighlightedNode] = useState(null);

  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [isSameNameModalOpen, setIsSameNameModalOpen] = useState(false);
  const [parentID, setParentID] = useState(null);

  const diagramRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openSameNameModal = () => setIsSameNameModalOpen(true);
  const closeSameNameModal = () => setIsSameNameModalOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      childGender: "male",
    },
  });

  const onSubmit = (data, nodeId) => {
    console.log(data);
    if (!data.childName || data.childName === "") {
      return;
    }

    let requestdata = { ...data };
    if (typeof nodeId === "string" && nodeId.trim() !== "") {
      requestdata.parentId = nodeId;
    }

    console.log("Request Data After Conditional:", requestdata);

    async function fetchData() {
      setIsButtonLoading(true);

      try {
        const response = await fetch(`http://localhost:8080/api/addChild`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestdata),
        });

        const result = await response.json();
        console.log("Add child API response:", result.error);

        if (result.error === "Parent not found") {
          toast.error("Parent not found");
          setIsButtonLoading(false);
          return;
        }

        if (
          result.error ===
          "Multiple parents found. Please enter a date of birth."
        ) {
          console.log("Inside if multiple parent found");
          console.log("Please enter a date of birth of father");
          setIsButtonLoading(false);
          closeModal();
          openSameNameModal();
          return;
        }

        if (
          result.error ===
          "Multiple parents found with the same name and date of birth"
        ) {
          toast.success("Please Select From following Trees");
          console.log(result.parents);
          closeSameNameModal();
          highlightNodes(result.parents.map((parent) => parent._id));

          setSameParentIDs(result.parents.map((parent) => parent._id));
          return;
        }

        toast.success("Your request has been sent to admin for review");
        setIsButtonLoading(false);
        // setData((prevData) => {
        //   const newData = [...prevData];
        //   newData.push({
        //     parent: result.child.parents[0],
        //     name: result.child.name,
        //     gender: result.child.gender,
        //     dateOfBirth: result.child.dateOfBirth.split("T")[0],
        //   });
        //   return newData;
        // });
        reset();
        closeModal();
        onClose();
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
      }
    }

    fetchData();
  };

  const onClose = () => {
    setIsConfirmModalOpen(false);
    setParentID(null);
  };

  const onConfirm = () => {
    handleSubmit((values) => onSubmit(values, parentID))();
  };

  handleNodeClick = (nodeID) => {
    console.log("Node clicked with ID:", nodeID);
    setIsConfirmModalOpen(true);
    setParentID(nodeID);
  };

  const moveToNextNode = () => {
    if (sameParentIDs.length === 0) return;

    const nextIndex = (currentNodeIndex + 1) % sameParentIDs.length;
    setCurrentNodeIndex(nextIndex);

    const nextNodeKey = sameParentIDs[nextIndex];
    highlightNodes([nextNodeKey]);
  };

  const moveToPreviousNode = () => {
    if (sameParentIDs.length === 0) return;

    const prevIndex =
      (currentNodeIndex - 1 + sameParentIDs.length) % sameParentIDs.length;
    setCurrentNodeIndex(prevIndex);

    const prevNodeKey = sameParentIDs[prevIndex];
    highlightNodes([prevNodeKey]);
  };

  const highlightNodes = (nodesToHighlight) => {
    const diagram = diagramRef.current?.getDiagram();

    if (diagram) {
      diagram.clearHighlighteds();

      const nodesArray = Array.isArray(nodesToHighlight)
        ? nodesToHighlight
        : [nodesToHighlight];

      // Ensure highlightedNode is set to the first highlighted node
      let highlightedNode = null;

      nodesArray.forEach((nodeId) => {
        const node = diagram.findNodeForKey(nodeId);
        if (node) {
          if (!highlightedNode) highlightedNode = node;

          node.part.addAdornment(
            "highlight",
            new go.Adornment(
              "Auto",
              new go.Shape("RoundedRectangle", {
                fill: "rgba(255,255,0,0.5)",
                stroke: "yellow",
                strokeWidth: 3,
              }),
              new go.Placeholder()
            )
          );

          diagram.centerRect(node.actualBounds);
          diagram.select(node);
        }
      });

      setHighlightedNode(highlightedNode); // Update the state with the first highlighted node
      diagram.requestUpdate();
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/api/members`, {
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Tree API response");
        console.log(result.familyTreeData);

        const { nodeDataArray, linkDataArray } = prepareGraphData(
          result.familyTreeData
        );

        setData(nodeDataArray);
        setLinkData(linkDataArray); // Update linkData state here
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className="flex justify-end mt-2 mb-2 mr-2">
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Member
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
              <div className="relative bg-white rounded-lg shadow-lg w-1/2 p-4">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
                <h2 className="text-lg font-bold mb-4">Add Member</h2>
                <form onSubmit={handleSubmit((values) => onSubmit(values, ""))}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Parent Name
                    </label>
                    <input
                      type="text"
                      {...register("parentName", {
                        required: "Parent name is required",
                        pattern: {
                          value: /^[A-Za-z\s.,'-]*$/,
                          message:
                            "Parent name should contain only letters, spaces, dots, commas, apostrophes, and hyphens.",
                        },
                      })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.parentName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter parent name"
                    />
                    {errors.parentName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.parentName.message}
                      </p>
                    )}
                  </div>

                  {/* Child Name Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Child Name
                    </label>
                    <input
                      type="text"
                      {...register("childName", {
                        required: "Child name is required",
                        pattern: {
                          value: /^[A-Za-z\s]*$/,
                          message: "Child name should contain only letters.",
                        },
                      })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.childName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter child name"
                    />
                    {errors.childName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.childName.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Child Gender
                    </label>
                    <div className="flex items-center">
                      <label className="mr-4">
                        <input
                          type="radio"
                          value="male"
                          {...register("childGender", {
                            required: "Child gender is required",
                          })}
                          className="mr-2"
                        />
                        Male
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="female"
                          {...register("childGender", {
                            required: "Child gender is required",
                          })}
                          className="mr-2"
                        />
                        Female
                      </label>
                    </div>
                    {errors.childGender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.childGender.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Child Date of Birth
                    </label>
                    <input
                      type="date"
                      {...register("childDateOfBirth", {
                        required: "Date of birth is required",
                        validate: {
                          notFuture: (value) =>
                            new Date(value) <= new Date() ||
                            "Date of birth cannot be in the future.",
                        },
                      })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.childDateOfBirth
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.childDateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.childDateOfBirth.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal} // Close modal on cancel
                      className="px-4 py-2 mr-2 text-base font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isButtonloading}
                      type="submit"
                      className="px-4 py-2 text-base font-medium text-white bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {`${isButtonloading ? "Loading..." : "Add"}`}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isSameNameModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
              <div className="relative bg-white rounded-lg shadow-lg w-1/2 p-4">
                <button
                  onClick={closeSameNameModal}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
                <h2 className="text-lg font-bold mb-4"></h2>
                <form onSubmit={handleSubmit((values) => onSubmit(values, ""))}>
                  <p className="text-lg font-bold mb-4 text-red-500">
                    More then one member found with given name please enter date
                    of birth
                  </p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {`Father's Date of Birth`}
                    </label>
                    <input
                      type="date"
                      {...register("parentDateOfBirth", {
                        required: "Date of birth is required",
                        validate: {
                          notFuture: (value) =>
                            new Date(value) <= new Date() ||
                            "Date of birth cannot be in the future.",
                        },
                      })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.parentDateOfBirth
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.parentDateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.parentDateOfBirth.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal} // Close modal on cancel
                      className="px-4 py-2 mr-2 text-base font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isButtonloading}
                      type="submit"
                      className="px-4 py-2 text-base font-medium text-white bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {`${isButtonloading ? "Loading..." : "Add"}`}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isConfirmModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-5 rounded shadow-md">
                <h3 className="text-lg font-semibold">
                  Are you sure you want to add a child?
                </h3>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={onConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 ml-5 mb-5">
            <button
              className="cursor-pointer p-2 rounded text-white bg-blue-400"
              onClick={moveToPreviousNode}
              disabled={sameParentIDs.length === 0}
            >
              Previous
            </button>
            <button
              className="cursor-pointer p-2 rounded text-white bg-blue-400"
              onClick={moveToNextNode}
              disabled={sameParentIDs.length === 0}
            >
              Next
            </button>
          </div>
            <ReactDiagram
              ref={diagramRef}
              initDiagram={() => initDiagram(data, linkData)}
              divClassName="diagram-component"
              nodeDataArray={data}
              linkDataArray={linkData}
              nodeTemplate={createNodeTemplate(handleNodeClick)}
            />

          <div style={{ position: "relative" }}>
            {highlightedNode && <FocusOverlay node={highlightedNode} />}
          </div>
        </>
      )}
    </>
  );
}

export default App;
