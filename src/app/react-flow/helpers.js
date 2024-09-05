import { ConnectionLineType } from "@xyflow/react";

export const getAllConnections = (data) => {
  let initialNodes = [];
  initialNodes = data.map((item) => {
    const totalNodes = [];
    totalNodes.push({
      id: item._id,
      data: {
        label: item.name,
      },
    });
    if (item.spouse?.length > 0) {
      item.spouse.forEach((spouse) => {
        // const id = `spouse-${item._id}-${spouse}`;
        if (
          !totalNodes.find(
            (node) => node.id === `spouse-${item._id}-${spouse}` || node.id === `spouse-${spouse}-${item._id}`
          )
        )
          totalNodes.push({
            id: `spouse-${item._id}-${spouse}`,
            // data: {
            //   label: "Spouse",
            // },
            shape: "diamond",
            isSpouse: true,

            style: {
              width: 1,
              height: 1,
              // make it appear as a diamond
              backgroundColor: "red",
              // borderRadius:å 0,
              // transform: "rotate(45deg)",
            },
          });
      });
    }

    return totalNodes.flat(Infinity);
  });

  initialNodes = initialNodes.flat(Infinity);
  return initialNodes;
};

export const getAllEdges = (data, initialNodes) => {
  let initialEdges = data.map((item) => {
    const edges = [];

    const findNode = initialNodes.find(
      (node) => node.id === `spouse-${item.father}-${item.mother}` || node.id === `spouse-${item.mother}-${item.father}`
    );
    if (findNode) {
      edges.push({
        id: "parents-" + item._id,
        source: findNode.id,
        target: item._id,
        type: ConnectionLineType.SmoothStep,
      });
      // edges.push({
      //   id: "mother-" + item._id,
      //   source: findNode.id,
      //   target: item._id,
      //   type: ConnectionLineType.SmoothStep,
      // });
    }
    if (item.spouse?.length > 0) {
      item.spouse.forEach((spouse) => {
        const findNode = initialNodes.find(
          (node) => node.id === `spouse-${item._id}-${spouse}` || node.id === `spouse-${spouse}-${item._id}`
        );

        if (findNode) {
          edges.push({
            id: `spouse-${item._id}-${spouse}`,
            source: item._id,
            target: findNode.id,
            type: ConnectionLineType.SmoothStep,
            animated: true,
          });
          edges.push({
            id: `spouse-${spouse}-${item._id}`,
            source: spouse,
            target: findNode.id,
            type: ConnectionLineType.SmoothStep,
            animated: true,
          });
        }
      });
    }
    return edges;
  });

  initialEdges = initialEdges.flat(Infinity);

  return initialEdges;
};
