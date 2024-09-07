import { ConnectionLineType } from "@xyflow/react";

export const getAllConnections = (data) => {
  const idSet = new Set(); // To track unique IDs

  let initialNodes = data.map((item) => {
    const totalNodes = [];
    const itemId = item._id;

    totalNodes.push({
      id: itemId,
      data: {
        label: item.name,
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
            type: "wedding",
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
  const edgeSet = new Set(); // To track unique edges

  let initialEdges = data.flatMap((item) => {
    const edges = [];

    const findNode = initialNodes.find(
      (node) => node.id === `spouse-${item.father}-${item.mother}` || node.id === `spouse-${item.mother}-${item.father}`
    );
    if (findNode) {
      edges.push({
        id: `parents-${item._id}`,
        source: findNode.id,
        target: item._id,
        type: ConnectionLineType.SmoothStep,
      });
    }

    if (item.spouseIds?.length > 0) {
      item.spouseIds.forEach((spouse) => {
        const findNode = initialNodes.find(
          (node) => node.id === `spouse-${item._id}-${spouse}` || node.id === `spouse-${spouse}-${item._id}`
        );

        if (findNode) {
          console.log("findNode", findNode);

          const edgeId1 = `spouse-${item._id}-${spouse}`;
          const edgeId2 = `spouse-${spouse}-${item._id}`;

          // Ensure edge IDs are unique
          if (!edgeSet.has(edgeId1)) {
            edgeSet.add(edgeId1);
            edges.push({
              id: edgeId1,
              source: item._id,
              target: findNode.id,
              targetHandle: "left",
              type: ConnectionLineType.SmoothStep,
            });
          }

          if (!edgeSet.has(edgeId2)) {
            edgeSet.add(edgeId2);
            edges.push({
              id: edgeId2,
              source: spouse,
              target: findNode.id,
              targetHandle: "right",
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
