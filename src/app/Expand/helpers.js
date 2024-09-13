import { ConnectionLineType } from "@xyflow/react";

export const getAllConnections = (data) => {
  const idSet = new Set(); // Track unique IDs

  let initialNodes = data.map((item) => {
    const totalNodes = [];
    const itemId = item._id;

    totalNodes.push({
      id: itemId,
      data: {
        label: item.name,
        level: 1, // Initial level for all nodes
      },
    });

    if (item.spouseIds?.length > 0) {
      item.spouseIds.forEach((spouse) => {
        const spouseId1 = `spouse-${itemId}-${spouse}`;
        const spouseId2 = `spouse-${spouse}-${itemId}`;

        // Ensure IDs are unique
        if (!idSet.has(spouseId1) && !idSet.has(spouseId2)) {
          idSet.add(spouseId1);
          totalNodes.push({
            id: spouseId1,
            shape: "diamond",
            isSpouse: true,
            style: {
              width: 1,
              height: 1,
              backgroundColor: "red",
            },
            data: {
              level: 1, // Initial level for spouse nodes
            },
          });
        }
      });
    }

    return totalNodes.flat(Infinity);
  });

  initialNodes = initialNodes.flat(Infinity);
  return initialNodes;
};

export const getAllEdges = (data, initialNodes) => {
  const edgeSet = new Set(); // Track unique edges

  let initialEdges = data.flatMap((item) => {
    const edges = [];

    const findParentNode = initialNodes.find(
      (node) =>
        node.id === `spouse-${item.father}-${item.mother}` ||
        node.id === `spouse-${item.mother}-${item.father}`
    );

    if (findParentNode) {
      edges.push({
        id: `parents-${item._id}`,
        source: findParentNode.id,
        target: item._id,
        type: ConnectionLineType.SmoothStep,
      });
    }

    if (item.spouseIds?.length > 0) {
      item.spouseIds.forEach((spouse) => {
        const findSpouseNode = initialNodes.find(
          (node) =>
            node.id === `spouse-${item._id}-${spouse}` ||
            node.id === `spouse-${spouse}-${item._id}`
        );

        if (findSpouseNode) {
          const edgeId1 = `spouse-${item._id}-${spouse}`;
          const edgeId2 = `spouse-${spouse}-${item._id}`;

          // Ensure edge IDs are unique
          if (!edgeSet.has(edgeId1)) {
            edgeSet.add(edgeId1);
            edges.push({
              id: edgeId1,
              source: item._id,
              target: findSpouseNode.id,
              type: ConnectionLineType.SmoothStep,
            });
          }

          if (!edgeSet.has(edgeId2)) {
            edgeSet.add(edgeId2);
            edges.push({
              id: edgeId2,
              source: spouse,
              target: findSpouseNode.id,
              type: ConnectionLineType.SmoothStep,
            });
          }
        }
      });
    }
    return edges;
  });

  return initialEdges;
};

export const calculateLevels = (data, nodeHeight, nodeGap) => {
  data.forEach((item) => (item.level = null));

  data = data.sort((a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth));

  data.forEach((item) => {
    if (
      !item.father &&
      !item.mother &&
      ["66d97923b3f4dc6c629e7e5b", "66d97923b3f4dc6c629e7e5c"].includes(
        item._id
      )
    ) {
      item.level = 0;
    }
  });

  data.forEach((item) => {
    if (item.father || item.mother) {
      let fatherNode = item.father
        ? data.find((d) => d._id === item.father)
        : null;
      let motherNode = item.mother
        ? data.find((d) => d._id === item.mother)
        : null;

      if (fatherNode) {
        if (fatherNode.level == null) {
          if (motherNode && motherNode.level != null) {
            fatherNode.level = motherNode.level;
          }
        }
        if (fatherNode.level != null) {
          item.level = Math.max(item.level ?? 0, fatherNode.level + 1);
        }
      }

      if (motherNode) {
        if (motherNode.level == null) {
          if (fatherNode && fatherNode.level != null) {
            motherNode.level = fatherNode.level;
          }
        }
        if (motherNode.level != null) {
          item.level = Math.max(item.level ?? 0, motherNode.level + 1);
        }
      }
    }
  });

  data.forEach((item) => {
    if (item.level == null) {
      let spouseNode = item.spouseIds
        ? item.spouseIds
            .map((spouseId) => data.find((d) => d._id === spouseId))
            .find((spouse) => spouse?.level != null)
        : null;

      if (spouseNode) {
        item.level = spouseNode.level + 1;
      }
    }
  });

  data.forEach((item) => {
    if (item.level == null) {
      let fatherNode = item.father
        ? data.find((d) => d._id === item.father)
        : null;
      let motherNode = item.mother
        ? data.find((d) => d._id === item.mother)
        : null;

      if (fatherNode && fatherNode.level != null) {
        item.level = Math.max(item.level ?? 0, fatherNode.level + 1);
      }

      if (motherNode && motherNode.level != null) {
        item.level = Math.max(item.level ?? 0, motherNode.level + 1);
      }
    }
  });

  data.forEach((item) => {
    item.Y = (item.level ?? 0) * (nodeHeight + nodeGap);
  });

  data = data.sort((a, b) => (a.level ?? Infinity) - (b.level ?? Infinity));
  return data;
};

export const calculateX = (nodeWidth, data) => {
  const levelGroups = {};

  // Step 1: Group items by their level
  data.forEach((item) => {
    if (item.level != null) {
      if (!levelGroups[item.level]) {
        levelGroups[item.level] = [];
      }
      levelGroups[item.level].push(item);
    }
  });

  // Step 2: Sort levels by the number of items in each level
  const sortedLevels = Object.keys(levelGroups)
    .map((level) => ({ level, count: levelGroups[level].length }))
    .sort((a, b) => b.count - a.count);

  // Step 3: Calculate the largest possible X size
  let largestX = 0;
  sortedLevels.forEach(({ level }) => {
    const groupSize = levelGroups[level].length;
    const groupWidth = (groupSize - 1) * (nodeWidth + 30); // Width of the entire group based on nodeWidth and spacing
    if (groupWidth > largestX) {
      largestX = groupWidth;
    }
  });

  // Step 4: Find the midpoint of the largest X size
  const midPointX = largestX / 2;

  // Step 5: Calculate and adjust X values for all levels
  sortedLevels.forEach(({ level }) => {
    const groupSize = levelGroups[level].length;
    const groupMidPoint = ((groupSize - 1) * (nodeWidth + 30)) / 2; // Midpoint for this specific group
    
    levelGroups[level].forEach((item, index) => {
      const xPosition = index * (nodeWidth + 30);
      const offset = midPointX - groupMidPoint; // Adjust based on the largest X midpoint
      item.X = xPosition + offset; // Shift the X position so the group is centered around the largest midpoint
    });
  });

  console.log("Data with calculated X values:");
  return data;
};


// export const calculateX = (nodeWidth, data) => {
//   const levelGroups = {};
//   data.forEach((item) => {
//     if (item.level != null) {
//       if (!levelGroups[item.level]) {
//         levelGroups[item.level] = [];
//       }
//       levelGroups[item.level].push(item);
//     }
//   });

//   const sortedLevels = Object.keys(levelGroups)
//     .map((level) => ({ level, count: levelGroups[level].length }))
//     .sort((a, b) => b.count - a.count);

//   sortedLevels.forEach(({ level }) => {
//     levelGroups[level].forEach((item, index) => {
//       item.X = index * (nodeWidth + 30);
//     });
//   });

//   console.log("Data with calculated X values:");

//   return JSON.stringify(data, null, 2);
// };

// import { ConnectionLineType } from "@xyflow/react";

// export const getAllConnections = (data) => {
//   const idSet = new Set();

//   let initialNodes = data.map((item) => {
//     const totalNodes = [];
//     const itemId = item._id;

//     totalNodes.push({
//       id: itemId,
//       data: {
//         label: item.name,
//       },
//     });

//     if (item.spouseIds?.length > 0) {
//       item.spouseIds.forEach((spouse) => {
//         const spouseId1 = `spouse-${itemId}-${spouse}`;
//         const spouseId2 = `spouse-${spouse}-${itemId}`;

//         // Ensure IDs are unique
//         if (!idSet.has(spouseId1) && !idSet.has(spouseId2)) {
//           idSet.add(spouseId1);
//           totalNodes.push({
//             id: spouseId1,
//             shape: "diamond",
//             isSpouse: true,
//             style: {
//               width: 1,
//               height: 1,
//               backgroundColor: "red",
//             },
//           });
//         }
//       });
//     }

//     return totalNodes.flat(Infinity);
//   });

//   initialNodes = initialNodes.flat(Infinity);
//   return initialNodes;
// };

// export const getAllEdges = (data, initialNodes) => {
//   const edgeSet = new Set(); // To track unique edges

//   let initialEdges = data.flatMap((item) => {
//     const edges = [];

//     const findNode = initialNodes.find(
//       (node) =>
//         node.id === `spouse-${item.father}-${item.mother}` ||
//         node.id === `spouse-${item.mother}-${item.father}`
//     );
//     if (findNode) {
//       edges.push({
//         id: `parents-${item._id}`,
//         source: findNode.id,
//         target: item._id,
//         type: ConnectionLineType.SmoothStep,
//       });
//     }

//     if (item.spouseIds?.length > 0) {
//       item.spouseIds.forEach((spouse) => {
//         const findNode = initialNodes.find(
//           (node) =>
//             node.id === `spouse-${item._id}-${spouse}` ||
//             node.id === `spouse-${spouse}-${item._id}`
//         );

//         if (findNode) {
//           const edgeId1 = `spouse-${item._id}-${spouse}`;
//           const edgeId2 = `spouse-${spouse}-${item._id}`;

//           // Ensure edge IDs are unique
//           if (!edgeSet.has(edgeId1)) {
//             edgeSet.add(edgeId1);
//             edges.push({
//               id: edgeId1,
//               source: item._id,
//               target: findNode.id,
//               type: ConnectionLineType.SmoothStep,
//             });
//           }

//           if (!edgeSet.has(edgeId2)) {
//             edgeSet.add(edgeId2);
//             edges.push({
//               id: edgeId2,
//               source: spouse,
//               target: findNode.id,
//               type: ConnectionLineType.SmoothStep,
//             });
//           }
//         }
//       });
//     }
//     return edges;
//   });

//   return initialEdges;
// };
