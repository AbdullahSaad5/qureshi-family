"use client";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import "./App.css";
import { createLinkTemplate, createNodeTemplate } from "../helpers/tree-helper";

function initDiagram(modelData = []) {
  // Default to empty array if modelData is undefined
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
  const [isButtonloading, setIsButtonLoading] = useState(false);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);
  const [sameParentIDs, setSameParentIDs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [isSameNameModalOpen, setIsSameNameModalOpen] = useState(false);

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

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    async function fetchData() {
      setIsButtonLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/addChild", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Add child API response:", result);

        if (result.error === "Parent not found") {
          toast.error("Parent not found");

          setIsButtonLoading(false);
          return;
        }

        if (result.error === "Multiple parents please enter a date of birth") {
          console.log("please enter a date of birth of father");
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
          reset();

          highlightNodes(result.parents.map((parent) => parent._id));
          setSameParentIDs(result.parents.map((parent) => parent._id));
          return;
        }

        toast.success("Child added successfully!");
        setFetchDataTrigger((prev) => !prev);
        setIsButtonLoading(false);
        reset();
        closeModal();
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  };

  const moveToNextNode = () => {
    if (sameParentIDs.length === 0) return;

    const nextIndex = (currentNodeIndex + 1) % sameParentIDs.length;
    setCurrentNodeIndex(nextIndex);

    const nextNodeKey = sameParentIDs[nextIndex];
    highlightNodes([nextNodeKey]); // Pass as an array
  };

  const moveToPreviousNode = () => {
    if (sameParentIDs.length === 0) return;

    const prevIndex =
      (currentNodeIndex - 1 + sameParentIDs.length) % sameParentIDs.length;
    setCurrentNodeIndex(prevIndex);

    const prevNodeKey = sameParentIDs[prevIndex];
    highlightNodes([prevNodeKey]); // Pass as an array
  };

  const highlightNodes = (nodesToHighlight) => {
    const diagram = diagramRef.current?.getDiagram();

    if (diagram) {
      diagram.clearHighlighteds();

      
      const nodesArray = Array.isArray(nodesToHighlight)
        ? nodesToHighlight
        : [nodesToHighlight];

      nodesArray.forEach((nodeId) => {
        const node = diagram.findNodeForKey(nodeId);
        if (node) {
          diagram.centerRect(node.actualBounds);
          diagram.select(node);
          node.isHighlighted = true;
        }
      });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

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

    return () => abortController.abort();
  }, [fetchDataTrigger]);

  useEffect(() => {
    console.log("Same parent IDs");
    console.log(sameParentIDs);
  }, [sameParentIDs]);

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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Parent Name
                    </label>
                    <input
                      type="text"
                      {...register("parentName", {
                        required: "Parent name is required",
                        pattern: {
                          value: /^[A-Za-z\s]*$/,
                          message: "Parent name should contain only letters.",
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
                <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="flex gap-5">
            <button
              className="cursor-pointer"
              onClick={moveToPreviousNode}
              disabled={sameParentIDs.length === 0}
            >
              Previous
            </button>
            <button
              className="cursor-pointer"
              onClick={moveToNextNode}
              disabled={sameParentIDs.length === 0}
            >
              Next
            </button>
          </div>

          <ReactDiagram
            ref={diagramRef}
            initDiagram={() => initDiagram(data)}
            divClassName="diagram-component"
            nodeDataArray={data}
            linkDataArray={[]}
          />
        </>
      )}
    </>
  );
}

export default App;

// "use client";
// import * as go from "gojs";
// import { ReactDiagram } from "gojs-react";
// import { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";

// import "./App.css";
// import { createLinkTemplate, createNodeTemplate } from "../helpers/tree-helper";

// function initDiagram(modelData) {
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

//   diagram.nodeTemplate = createNodeTemplate();

//   // Initially center on root:
//   diagram.addDiagramListener("InitialLayoutCompleted", () => {
//     const root = diagram.findNodeForKey("66cdb9c49f9e60170b886c5a");
//     if (!root) return;
//     diagram.scale = 0.6;
//     diagram.scrollToRect(root.actualBounds);
//   });

//   return diagram;
// }

// function App() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isButtonloading, setIsButtonLoading] = useState(false);
//   const [fetchDataTrigger, setFetchDataTrigger] = useState(false);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSameNameModalOpen, setIsSameNameModalOpen] = useState(false);

//   const diagramRef = useRef(null);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const openSameNameModal = () => setIsSameNameModalOpen(true);
//   const closeSameNameModal = () => setIsSameNameModalOpen(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       childGender: "male",
//     },
//   });

//   const onSubmit = (data) => {
//     console.log("Form Data:", data);

//     async function fetchData() {
//       setIsButtonLoading(true);

//       try {
//         const response = await fetch("http://localhost:8080/api/addChild", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });

//         const result = await response.json();
//         console.log("Add child API response:", result);

//         if (result.error === "Parent not found") {
//           toast.error("Parent not found");

//           setIsButtonLoading(false);
//           return;
//         }

//         if (result.error === "Multiple parents please enter a date of birth") {
//           console.log("please enter a date of birth of father");
//           setIsButtonLoading(false);

//           closeModal();

//           openSameNameModal();
//           return;
//         }

//         if (
//           result.error ===
//           "Multiple parents found with the same name and date of birth"
//         ) {
//           toast.success("Please Select From following Trees");
//           console.log(result.parents);

//           closeSameNameModal();
//           // Call highlightNodes function with the ids from result.parents
//           highlightNodes(result.parents.map((parent) => parent._id));
//           return;
//         }

//         toast.success("Child added successfully!");
//         setFetchDataTrigger((prev) => !prev);
//         setIsButtonLoading(false);
//         reset();
//         closeModal();
//       } catch (error) {
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   };

//   const highlightNodes = (nodesToHighlight) => {
//     const diagram = diagramRef.current?.getDiagram(); // Get the diagram reference

//     if (diagram) {
//       diagram.clearHighlighteds(); // Clear previous highlights

//       nodesToHighlight.forEach((nodeId) => {
//         const node = diagram.findNodeForKey(nodeId); // Find each node by its key (_id)
//         if (node) {
//           diagram.centerRect(node.actualBounds); // Center the view on the node
//           diagram.select(node); // Optionally, select the node
//           node.isHighlighted = true; // Highlight the node
//         }
//       });

//       // Optionally, zoom in or adjust the view to show all highlighted nodes
//       diagram.zoomToFit();
//     }
//   };

//   useEffect(() => {
//     const abortController = new AbortController();
//     setLoading(true);

//     async function fetchData() {
//       try {
//         const response = await fetch("http://localhost:8080/api/members", {
//           signal: abortController.signal,
//         });
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const result = await response.json();
//         console.log("Tree API response");
//         console.log(result.familyTreeData);

//         const formattedData = result.familyTreeData.map((node) => ({
//           ...node,
//           parent: node.parent ? node.parent : "",
//         }));

//         setData(formattedData);
//       } catch (error) {
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();

//     return () => abortController.abort();
//   }, [fetchDataTrigger]);

//   return (
//     <>
//       {loading ? (
//         <div className="loader"></div>
//       ) : (
//         <>
//           <div className="flex justify-end mt-2 mb-2 mr-2">
//             <button
//               onClick={openModal}
//               className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Add Member
//             </button>
//           </div>

//           {isModalOpen && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
//               <div className="relative bg-white rounded-lg shadow-lg w-1/2 p-4">
//                 <button
//                   onClick={closeModal}
//                   className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
//                 >
//                   &times;
//                 </button>
//                 <h2 className="text-lg font-bold mb-4">Add Member</h2>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Parent Name
//                     </label>
//                     <input
//                       type="text"
//                       {...register("parentName", {
//                         required: "Parent name is required",
//                         pattern: {
//                           value: /^[A-Za-z\s]*$/,
//                           message: "Parent name should contain only letters.",
//                         },
//                       })}
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         errors.parentName ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder="Enter parent name"
//                     />
//                     {errors.parentName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.parentName.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Child Name Input */}
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Child Name
//                     </label>
//                     <input
//                       type="text"
//                       {...register("childName", {
//                         required: "Child name is required",
//                         pattern: {
//                           value: /^[A-Za-z\s]*$/,
//                           message: "Child name should contain only letters.",
//                         },
//                       })}
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         errors.childName ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder="Enter child name"
//                     />
//                     {errors.childName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.childName.message}
//                       </p>
//                     )}
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Child Gender
//                     </label>
//                     <div className="flex items-center">
//                       <label className="mr-4">
//                         <input
//                           type="radio"
//                           value="male"
//                           {...register("childGender", {
//                             required: "Child gender is required",
//                           })}
//                           className="mr-2"
//                         />
//                         Male
//                       </label>
//                       <label>
//                         <input
//                           type="radio"
//                           value="female"
//                           {...register("childGender", {
//                             required: "Child gender is required",
//                           })}
//                           className="mr-2"
//                         />
//                         Female
//                       </label>
//                     </div>
//                     {errors.childGender && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.childGender.message}
//                       </p>
//                     )}
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Child Date of Birth
//                     </label>
//                     <input
//                       type="date"
//                       {...register("childDateOfBirth", {
//                         required: "Date of birth is required",
//                         validate: {
//                           notFuture: (value) =>
//                             new Date(value) <= new Date() ||
//                             "Date of birth cannot be in the future.",
//                         },
//                       })}
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         errors.childDateOfBirth
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />
//                     {errors.childDateOfBirth && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.childDateOfBirth.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Submit Button */}
//                   <div className="flex justify-end">
//                     <button
//                       type="button"
//                       onClick={closeModal} // Close modal on cancel
//                       className="px-4 py-2 mr-2 text-base font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       disabled={isButtonloading}
//                       type="submit"
//                       className="px-4 py-2 text-base font-medium text-white bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                       {`${isButtonloading ? "Loading..." : "Add"}`}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}

//           {isSameNameModalOpen && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
//               <div className="relative bg-white rounded-lg shadow-lg w-1/2 p-4">
//                 <button
//                   onClick={closeSameNameModal}
//                   className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
//                 >
//                   &times;
//                 </button>
//                 <h2 className="text-lg font-bold mb-4"></h2>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <p className="text-lg font-bold mb-4 text-red-500">
//                     More then one member found with given name please enter date
//                     of birth
//                   </p>

//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {`Father's Date of Birth`}
//                     </label>
//                     <input
//                       type="date"
//                       {...register("parentDateOfBirth", {
//                         required: "Date of birth is required",
//                         validate: {
//                           notFuture: (value) =>
//                             new Date(value) <= new Date() ||
//                             "Date of birth cannot be in the future.",
//                         },
//                       })}
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         errors.parentDateOfBirth
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />
//                     {errors.parentDateOfBirth && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.parentDateOfBirth.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Submit Button */}
//                   <div className="flex justify-end">
//                     <button
//                       type="button"
//                       onClick={closeModal} // Close modal on cancel
//                       className="px-4 py-2 mr-2 text-base font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       disabled={isButtonloading}
//                       type="submit"
//                       className="px-4 py-2 text-base font-medium text-white bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                       {`${isButtonloading ? "Loading..." : "Add"}`}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}

//           <ReactDiagram
//             initDiagram={() => initDiagram(data)}
//             divClassName="diagram-component"
//             nodeDataArray={data}
//           />
//         </>
//       )}
//     </>
//   );
// }

// export default App;
