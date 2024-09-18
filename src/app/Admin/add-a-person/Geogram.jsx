// import '../App.css';
import React, {
  Component,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { BiFullscreen } from "react-icons/bi";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import Modal4 from "../../components/Modals/Modal4";
// import male from "../_assets/male.png";
// import female from "../_assets/female.png";

let genoData;

const SPOUSE_SPACING = 30;
const NODE_WIDTH = 200;
const NODE_HEIGHT = 80;

const MALE_BACKGROUND = "#afd5ef";
const FEMALE_BACKGROUND = "#f5dad7";
const LINK_COLOR = "#424242";
const MARRIAGE_COLOR = "#000000";

function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  go.Diagram.licenseKey = "adsfewfwaefasdfdsfs";
  const diagram = $(go.Diagram, {
    initialDocumentSpot: go.Spot.Bottom,
    initialViewportSpot: go.Spot.Bottom,
    "undoManager.isEnabled": true, // must be set to allow for model change listening
    initialAutoScale: go.Diagram.Uniform,
    allowMove: false,
    allowDragOut: false,
    allowLink: false,
    allowRelink: false,
    minScale: 0.2,
    maxScale: 1,

    click: (e) => {
      const part = e.diagram.findPartAt(e.documentPoint, true);
      if (part instanceof go.Node) {
        console.log(part.data);
      }
    },
    model: $(go.GraphLinksModel, {
      linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
    "toolManager.hoverDelay": 400,
    "toolManager.toolTipDuration": 10000,

    // Make highlighted nodes stand out with red stroke
    nodeSelectionAdornmentTemplate: $(
      go.Adornment,
      "Auto",
      { layerName: "Grid" }, // the predefined layer that is behind everything else
      $(go.Shape, "RoundedRectangle", {
        stroke: "#0066c635",
        strokeWidth: 2,
        fill: null,
      }),
      $(go.Placeholder, { margin: 0 })
    ),

    layout: $(GenogramLayout, {
      direction: 90,
      layerSpacing: 30,
      columnSpacing: 10,
    }),
  });

  function makeExpanderButton(color) {
    return $(
      "PanelExpanderButton",
      "BUTTON",
      {
        width: 20,
        height: 20,
        alignment: go.Spot.TopRight,
        alignmentFocus: go.Spot.Center,
        visible: false,
      },
      $(go.Shape, "Circle", { fill: color, stroke: null }),
      $(go.Shape, "PlusLine", { stroke: "white", strokeWidth: 2 })
    );
  }

  diagram.nodeTemplate = $(
    go.Node,
    "Auto",
    {
      isTreeExpanded: false,
      selectionObjectName: "SHAPE",
    },
    $(
      go.Shape,
      "RoundedRectangle",
      {
        name: "SHAPE",
        fill: "white",
        strokeWidth: 2,
        stroke: "#80b6fc",
        portId: "",
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        parameter1: 10,
      },
      new go.Binding("fill", "s", (s) =>
        s === "M" ? MALE_BACKGROUND : FEMALE_BACKGROUND
      )
    ),
    $(
      go.Panel,
      "Vertical",
      $(
        go.TextBlock,
        {
          font: "bold 14px sans-serif",
          margin: 5,
          alignment: go.Spot.TopLeft,
          maxSize: new go.Size(NODE_WIDTH - 30, NaN),
        },
        new go.Binding("text", "n")
      ),
      $(
        go.TextBlock,
        {
          font: "12px sans-serif",
          margin: 5,
          alignment: go.Spot.TopLeft,
        },
        new go.Binding("text", "dob", (dob) => `DOB: ${dob || "Unknown"}`)
      ),
      $(
        go.TextBlock,
        {
          font: "12px sans-serif",
          margin: 5,
          alignment: go.Spot.TopLeft,
        },
        new go.Binding(
          "text",
          "tribe",
          (tribe) => `Tribe: ${tribe || "Unknown"}`
        )
      )
    ),
    makeExpanderButton("#80b6fc"),
    {
      click: (e, obj) => {
        e.diagram.startTransaction("toggled expand/collapse");
        const node = obj.part;
        if (node) {
          node.isTreeExpanded = !node.isTreeExpanded;
        }
        e.diagram.commitTransaction("toggled expand/collapse");
      },
    },
    new go.Binding("isTreeExpanded").makeTwoWay(),
    new go.Binding("wasTreeExpanded").makeTwoWay()
  );

  diagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.Orthogonal, corner: 5 },
    $(go.Shape, { strokeWidth: 2, stroke: LINK_COLOR })
  );

  // THIS IS THE TOOLTIP THAT IS BEING SHOWN ON THE HOVER

  let nodeToolTip = $(
    go.Adornment,
    "Auto",
    $(go.Shape, "RoundedRectangle", {
      fill: "white",
      stroke: "black",
      strokeWidth: 1,
    }),
    $(
      go.Panel,
      "Vertical",
      { margin: 8 },
      $(
        go.TextBlock,
        { font: "bold 14px sans-serif", margin: 2 },
        new go.Binding("text", "n")
      ),
      $(
        go.TextBlock,
        {
          font: "12px sans-serif",
          margin: 2,
          visible: false, // Set to false by default
        },
        new go.Binding(
          "text",
          "",
          (data) => `Date of Birth: ${data.dob || "N/A"}`
        ),
        new go.Binding("visible", "dob", (dob) => Boolean(dob))
      ),
      $(
        go.TextBlock,
        { font: "12px sans-serif", margin: 2, visible: false },
        new go.Binding("text", "", (data) => `Age: ${data.age || "N/A"}`),
        new go.Binding("visible", "age", (age) => Boolean(age))
      ),
      $(
        go.TextBlock,
        { font: "12px sans-serif", margin: 2, visible: false },
        new go.Binding(
          "text",
          "",
          (data) => `Occupation: ${data.occupation || "N/A"}`
        ),
        new go.Binding("visible", "occupation", (occupation) =>
          Boolean(occupation)
        )
      ),
      $(
        go.TextBlock,
        { font: "12px sans-serif", margin: 2, visible: false },
        new go.Binding(
          "text",
          "",
          (data) => `Address: ${data.address || "N/A"}`
        ),
        new go.Binding("visible", "address", (address) => Boolean(address))
      ),
      $(
        go.TextBlock,
        { font: "12px sans-serif", margin: 2, visible: false },
        new go.Binding(
          "text",
          "",
          (data) => `Biography: ${data.biography || "N/A"}`
        ),
        new go.Binding("visible", "biography", (biography) =>
          Boolean(biography)
        )
      )

      // ADD MORE FIELDS HERE
    )
  );

  function nodeTemplate(gender) {
    const maleImage = "https://www.w3schools.com/howto/img_avatar.png"; // Male avatar
    const femaleImage = "https://www.w3schools.com/howto/img_avatar2.png"; // Female avatar

    return $(
      go.Node,
      "Auto",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "SHAPE",
        selectionObjectName: "SHAPE",
        layerName: "Foreground",
        cursor: "pointer",
        toolTip: nodeToolTip, // Add the tooltip to the node
        click: (e, node) => {
          const showModal = node.diagram.model.modelData.showModal;
          const setData = node.diagram.model.modelData.setData;
          if (showModal && setData) {
            setData(node.data);
            showModal();
          }
        },
      },
      $(go.Shape, "RoundedRectangle", {
        name: "SHAPE",
        fill: gender === "M" ? MALE_BACKGROUND : FEMALE_BACKGROUND,
        stroke: gender === "M" ? "#5dade2" : "#f09e97",
        strokeWidth: 2,
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        parameter1: gender === "M" ? 5 : 10, // corner radius
        portId: "",
      }),
      $(
        go.Panel,
        "Vertical",
        { margin: 5 },
        // Image panel
        $(
          go.Panel,
          "Position",
          { alignment: go.Spot.TopCenter, alignmentFocus: go.Spot.TopCenter },
          $(go.Picture, {
            source: gender === "M" ? maleImage : femaleImage,
            width: 48, // set width
            height: 48, // set height
            imageStretch: go.GraphObject.UniformToFill, // similar to object-fit: cover
            alignment: go.Spot.TopCenter,
            margin: new go.Margin(-12, 0, 0, 0), // position the image with half above the node
          })
        ),
        $(
          go.Panel,
          "Horizontal",
          { margin: 5 },
          $(
            go.Panel,
            "Vertical",
            { alignment: go.Spot.Left },
            $(
              go.TextBlock,
              { font: "bold 14px sans-serif", maxSize: new go.Size(180, NaN) },
              new go.Binding("text", "n")
            ),
            $(
              go.TextBlock,
              { font: "12px sans-serif", maxSize: new go.Size(180, NaN) },
              new go.Binding(
                "text",
                "",
                (data) => `DOB: ${data.dob || "Unknown"}`
              )
            ),
            $(
              go.TextBlock,
              { font: "12px sans-serif", maxSize: new go.Size(180, NaN) },
              new go.Binding(
                "text",
                "",
                (data) => `Tribe: ${data.tribe || "Unknown"}`
              )
            )
          )
        )
      )
    );
  }

  // console.log(go.TreeExpanderButton);

  // Define the node template with TreeExpanderButton
  // diagram.nodeTemplate = $(
  //   go.Node,
  //   "Horizontal",
  //   {
  //     locationSpot: go.Spot.Center,
  //     locationObjectName: "SHAPE",
  //     selectionObjectName: "SHAPE",
  //     layerName: "Foreground",
  //     cursor: "pointer",
  //     toolTip: nodeToolTip,
  //     click: (e, node) => {
  //       const showModal = node.diagram.model.modelData.showModal;
  //       const setData = node.diagram.model.modelData.setData;
  //       if (showModal && setData) {
  //         setData(node.data);
  //         showModal();
  //       }
  //     },
  //   },
  //   $(go.Shape, "Ellipse", {
  //     name: "SHAPE",
  //     fill: "white",
  //     strokeWidth: 1,
  //   }),
  //   $(go.TextBlock, { margin: 5 }, new go.Binding("text", "key")),
  //   $(
  //     go.Panel,
  //     "Horizontal",
  //     { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
  //     $(go.TreeExpanderButton)
  //   )
  // );

  // function nodeTemplate(gender) {
  //   return $(
  //     go.Node,
  //     "Auto",
  //     {
  //       locationSpot: go.Spot.Center,
  //       locationObjectName: "SHAPE",
  //       selectionObjectName: "SHAPE",
  //       layerName: "Foreground",
  //       cursor: "pointer",
  //       toolTip: nodeToolTip, // Add the tooltip to the node
  //       click: (e, node) => {
  //         // toggleChildrenVisibility(node);
  //         const showModal = node.diagram.model.modelData.showModal;
  //         const setData = node.diagram.model.modelData.setData;
  //         if (showModal && setData) {
  //           setData(node.data);
  //           showModal();
  //         }
  //       },
  //     },
  //     $(go.Shape, "RoundedRectangle", {
  //       name: "SHAPE",
  //       fill: gender === "M" ? MALE_BACKGROUND : FEMALE_BACKGROUND,
  //       stroke: gender === "M" ? "#5dade2" : "#f09e97",
  //       strokeWidth: 2,
  //       width: NODE_WIDTH,
  //       height: NODE_HEIGHT,
  //       parameter1: gender === "M" ? 5 : 10, // corner radius
  //       portId: "",
  //     }),
  //     $(
  //       go.Panel,
  //       "Horizontal",
  //       { margin: 5 },
  //       $(
  //         go.Panel,
  //         "Vertical",
  //         { alignment: go.Spot.Left },
  //         $(
  //           go.TextBlock,
  //           { font: "bold 14px sans-serif", maxSize: new go.Size(180, NaN) },
  //           new go.Binding("text", "n")
  //         ),
  //         // Add a blank line after the name
  //         $(
  //           go.TextBlock,
  //           { font: "12px sans-serif", maxSize: new go.Size(180, NaN) },
  //           new go.Binding(
  //             "text",
  //             "",
  //             (data) => `DOB: ${data.dob || "Unknown"}`
  //           )
  //         ),
  //         $(
  //           go.TextBlock,
  //           { font: "12px sans-serif", maxSize: new go.Size(180, NaN) },
  //           new go.Binding(
  //             "text",
  //             "",
  //             (data) => `Tribe: ${data.tribe || "Unknown"}`
  //           )
  //         )
  //       )
  //     )
  //   );
  // }

  diagram.nodeTemplateMap.add("M", nodeTemplate("M"));
  diagram.nodeTemplateMap.add("F", nodeTemplate("F"));

  setupDiagram(diagram, genoData, 4 /* focus on this person */);

  diagram.linkTemplate = // for parent-child relationships
    $(
      go.Link,
      new go.Binding("routing", "routing"),
      {
        corner: 5,
        layerName: "Background",
        selectable: false,
        fromSpot: go.Spot.Bottom,
        toSpot: go.Spot.Top,
      },
      $(go.Shape, { stroke: LINK_COLOR, strokeWidth: 2 })
    );

  diagram.linkTemplateMap.add(
    "Marriage", // for marriage relationships
    $(
      go.Link,
      {
        selectable: false,
      },
      $(go.Shape, { strokeWidth: 2.5, stroke: MARRIAGE_COLOR /* blue */ })
    )
  );

  // define a simple Node template
  diagram.nodeTemplate = $(
    go.Node,
    "Auto", // the Shape will go around the TextBlock
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    $(
      go.Shape,
      "Rectangle",
      {
        name: "SHAPE",
        fill: "white",
        strokeWidth: 1,
      },
      // Shape.fill is bound to Node.data.color
      new go.Binding("fill", "color")
    )

    // $(
    //   go.TextBlock,
    //   { margin: 8, editable: true }, // some room around the text
    //   new go.Binding("text").makeTwoWay()
    // )
  );

  return diagram;
}

function setupDiagram(diagram, array, focusId) {
  const model = go.GraphObject.make(go.GraphLinksModel, {
    linkLabelKeysProperty: "labelKeys",
    nodeCategoryProperty: "s",
    copiesArrays: true,
    nodeDataArray: array,
    linkKeyProperty: "key",
  });

  diagram.model = model;

  // Pre-process data to create a map for quick lookups
  const nodeMap = new Map(array.map((node) => [node.key, node]));

  setupMarriages(diagram, nodeMap);
  setupParents(diagram, nodeMap);

  if (focusId) {
    const node = diagram.findNodeForKey(focusId);
    if (node) diagram.select(node);
  }
}

function setupMarriages(diagram, nodeMap) {
  const model = diagram.model;
  const marriageLinks = new Set();

  nodeMap.forEach((data, key) => {
    const spouses = Array.isArray(data.spouses)
      ? data.spouses
      : data.spouses
      ? [data.spouses]
      : [];

    spouses.forEach((spouse) => {
      if (key === spouse) return; // Skip reflexive marriages

      const marriageId = [key, spouse].sort().join("-");
      if (marriageLinks.has(marriageId)) return; // Skip if marriage already processed

      marriageLinks.add(marriageId);

      const mlab = { s: "LinkLabel" };
      model.addNodeData(mlab);

      model.addLinkData({
        from: key,
        to: spouse,
        labelKeys: [mlab.key],
        category: "Marriage",
      });
    });
  });
}

function setupParents(diagram, nodeMap) {
  const model = diagram.model;
  const marriageLinks = new Map();

  // First, create a map of all marriages
  model.linkDataArray.forEach((link) => {
    if (link.category === "Marriage") {
      const key = [link.from, link.to].sort().join("-");
      marriageLinks.set(key, link.labelKeys[0]);
    }
  });

  nodeMap.forEach((data, key) => {
    const { m: mother, f: father, t: twin } = data;
    if (mother && father) {
      const marriageKey = [mother, father].sort().join("-");
      const mlabkey = marriageLinks.get(marriageKey);

      if (mlabkey) {
        model.addLinkData({
          from: mlabkey,
          to: key,
          routing: twin ? go.Link.Normal : go.Link.Orthogonal,
        });
      } else if (window.console) {
        console.log("unknown marriage: " + mother + " & " + father);
      }
    }
  });
}

function findMarriage(diagram, a, b) {
  const nodeA = diagram.findNodeForKey(a);
  const nodeB = diagram.findNodeForKey(b);
  if (nodeA && nodeB) {
    const it = nodeA.findLinksBetween(nodeB);
    while (it.next()) {
      const link = it.value;
      if (link.data && link.data.category === "Marriage") return link;
    }
  }
  return null;
}

function GenogramLayout() {
  go.LayeredDigraphLayout.call(this);
  this.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
  this.spouseSpacing = SPOUSE_SPACING; // minimum space between spouses
}
go.Diagram.inherit(GenogramLayout, go.LayeredDigraphLayout);

GenogramLayout.prototype.makeNetwork = function (coll) {
  const net = this.createNetwork();
  if (coll instanceof go.Diagram) {
    this.add(net, coll.nodes, true);
    this.add(net, coll.links, true);
  } else if (coll instanceof go.Group) {
    this.add(net, coll.memberParts, false);
  } else if (coll.iterator) {
    this.add(net, coll.iterator, false);
  }
  return net;
};

// internal method for creating LayeredDigraphNetwork where husband/wife pairs are represented
// by a single LayeredDigraphVertex corresponding to the label Node on the marriage Link
GenogramLayout.prototype.add = function (net, coll, nonmemberonly) {
  let multiSpousePeople = new go.Set();
  let it = coll.iterator;
  while (it.next()) {
    let node = it.value;
    if (!(node instanceof go.Node)) continue;
    if (!node.isLayoutPositioned || !node.isVisible()) continue;
    if (nonmemberonly && node.containingGroup !== null) continue;
    if (node.isLinkLabel) {
      let link = node.labeledLink;
      let spouseA = link.fromNode;
      let spouseB = link.toNode;

      // Ensure spouseA and spouseB are not null
      if (spouseA === null || spouseB === null) {
        console.error("Invalid link with null spouse nodes", link);
        continue;
      }

      let vertex = net.addNode(node);
      vertex.width =
        spouseA.actualBounds.width +
        this.spouseSpacing +
        spouseB.actualBounds.width;
      vertex.height = Math.max(
        spouseA.actualBounds.height,
        spouseB.actualBounds.height
      );
      vertex.focus = new go.Point(
        spouseA.actualBounds.width + this.spouseSpacing / 2,
        vertex.height / 2
      );
    } else {
      let marriages = 0;
      node.linksConnected.each(function (l) {
        if (l.isLabeledLink) marriages++;
      });
      if (marriages === 0) {
        let vertex = net.addNode(node);
      } else if (marriages > 1) {
        multiSpousePeople.add(node);
      }
    }
  }

  it.reset();
  while (it.next()) {
    let link = it.value;
    if (!(link instanceof go.Link)) continue;
    if (!link.isLayoutPositioned || !link.isVisible()) continue;
    if (nonmemberonly && link.containingGroup !== null) continue;
    if (!link.isLabeledLink) {
      let parent = net.findVertex(link.fromNode);
      let child = net.findVertex(link.toNode);
      if (child !== null) {
        net.linkVertexes(parent, child, link);
      } else {
        link.toNode.linksConnected.each(function (l) {
          if (!l.isLabeledLink) return;
          let mlab = l.labelNodes.first();
          let mlabvert = net.findVertex(mlab);
          if (mlabvert !== null) {
            net.linkVertexes(parent, mlabvert, link);
          }
        });
      }
    }
  }

  while (multiSpousePeople.count > 0) {
    let node = multiSpousePeople.first();
    let cohort = new go.Set();
    this.extendCohort(cohort, node);
    let dummyvert = net.createVertex();
    net.addVertex(dummyvert);
    let marriages = new go.Set();
    cohort.each(function (n) {
      n.linksConnected.each(function (l) {
        marriages.add(l);
      });
    });
    marriages.each(function (link) {
      let mlab = link.labelNodes.first();
      let v = net.findVertex(mlab);
      if (v !== null) {
        net.linkVertexes(dummyvert, v, null);
      }
    });
    multiSpousePeople.removeAll(cohort);
  }
};

// collect all of the people indirectly married with a person
GenogramLayout.prototype.extendCohort = function (coll, node) {
  if (coll.has(node)) return;
  coll.add(node);
  let lay = this;
  node?.linksConnected.each(function (l) {
    if (l.isLabeledLink) {
      // if it's a marriage link, continue with both spouses
      lay.extendCohort(coll, l.fromNode);
      lay.extendCohort(coll, l.toNode);
    }
  });
};

GenogramLayout.prototype.assignLayers = function () {
  go.LayeredDigraphLayout.prototype.assignLayers.call(this);
  let horiz = this.direction === 0.0 || this.direction === 180.0;
  // for every vertex, record the maximum vertex width or height for the vertex's layer
  let maxsizes = [];
  this.network.vertexes.each(function (v) {
    let lay = v.layer;
    let max = maxsizes[lay];
    if (max === undefined) max = 0;
    let sz = horiz ? v.width : v.height;
    if (sz > max) maxsizes[lay] = sz;
  });
  // now make sure every vertex has the maximum width or height according to which layer it is in,
  // and aligned on the left (if horizontal) or the top (if vertical)
  this.network.vertexes.each(function (v) {
    let lay = v.layer;
    let max = maxsizes[lay];
    if (horiz) {
      v.focus = new go.Point(0, v.height / 2);
      v.width = max;
    } else {
      v.focus = new go.Point(v.width / 2, 0);
      v.height = max;
    }
  });
  // from now on, the LayeredDigraphLayout will think that the Node is bigger than it really is
  // (other than the ones that are the widest or tallest in their respective layer).
};

GenogramLayout.prototype.commitNodes = function () {
  go.LayeredDigraphLayout.prototype.commitNodes.call(this);
  // position regular nodes
  this.network.vertexes.each(function (v) {
    if (v.node !== null && !v.node.isLinkLabel) {
      v.node.position = new go.Point(v.x, v.y);
    }
  });
  // position the spouses of each marriage vertex
  let layout = this;
  this.network.vertexes.each(function (v) {
    if (v.node === null) return;
    if (!v.node.isLinkLabel) return;
    let labnode = v.node;
    let lablink = labnode.labeledLink;
    // In case the spouses are not actually moved, we need to have the marriage link
    // position the label node, because LayoutVertex.commit() was called above on these vertexes.
    // Alternatively we could override LayoutVetex.commit to be a no-op for label node vertexes.
    lablink.invalidateRoute();
    let spouseA = lablink.fromNode;
    let spouseB = lablink.toNode;
    // prefer fathers on the left, mothers on the right
    if (spouseA.data.s === "F") {
      // sex is female
      let temp = spouseA;
      spouseA = spouseB;
      spouseB = temp;
    }
    // see if the parents are on the desired sides, to avoid a link crossing
    let aParentsNode = layout.findParentsMarriageLabelNode(spouseA);
    let bParentsNode = layout.findParentsMarriageLabelNode(spouseB);
    if (
      aParentsNode !== null &&
      bParentsNode !== null &&
      aParentsNode.position.x > bParentsNode.position.x
    ) {
      // swap the spouses
      let temp = spouseA;
      spouseA = spouseB;
      spouseB = temp;
    }
    spouseA.position = new go.Point(v.x, v.y);
    spouseB.position = new go.Point(
      v.x + spouseA.actualBounds.width + layout.spouseSpacing,
      v.y
    );
    if (spouseA.opacity === 0) {
      let pos = new go.Point(v.centerX - spouseA.actualBounds.width / 2, v.y);
      spouseA.position = pos;
      spouseB.position = pos;
    } else if (spouseB.opacity === 0) {
      let pos = new go.Point(v.centerX - spouseB.actualBounds.width / 2, v.y);
      spouseA.position = pos;
      spouseB.position = pos;
    }
  });
  // position only-child nodes to be under the marriage label node
  this.network.vertexes.each(function (v) {
    if (v.node === null || v.node.linksConnected.count > 1) return;
    let mnode = layout.findParentsMarriageLabelNode(v.node);
    if (mnode !== null && mnode.linksConnected.count === 1) {
      // if only one child
      let mvert = layout.network.findVertex(mnode);
      let newbnds = v.node.actualBounds.copy();
      newbnds.x = mvert.centerX - v.node.actualBounds.width / 2;
      // see if there's any empty space at the horizontal mid-point in that layer
      let overlaps = layout.diagram.findObjectsIn(
        newbnds,
        function (x) {
          return x.part;
        },
        function (p) {
          return p !== v.node;
        },
        true
      );
      if (overlaps.count === 0) {
        v.node.move(newbnds.position);
      }
    }
  });
};

GenogramLayout.prototype.findParentsMarriageLabelNode = function (node) {
  let it = node.findNodesInto();
  while (it.next()) {
    let n = it.value;
    if (n.isLinkLabel) return n;
  }
  return null;
};

function handleModelChange(e) {
  // console.log(e);
}

// const focusOnFirstNode = (diagram) => {
//   const firstNode = diagram.nodes.first(); // Get the first node
//   if (firstNode) {
//     // Get the bounds of the first node
//     const nodeBounds = firstNode.actualBounds;

//     // Adjust zoom level to control how much zoomed in you want to be
//     const zoomFactor = 1.2; // Adjust this value to zoom in more or less
//     const viewportWidth = diagram.viewportBounds.width;
//     const viewportHeight = diagram.viewportBounds.height;

//     // Calculate the rectangle to zoom into with an adjusted size
//     const zoomRect = nodeBounds
//       .copy()
//       .inflate(
//         nodeBounds.width * (zoomFactor - 1),
//         nodeBounds.height * (zoomFactor - 1)
//       );

//     // Center the rectangle within the viewport
//     const centerX = zoomRect.centerX;
//     const centerY = zoomRect.centerY;
//     const newScale = Math.min(
//       viewportWidth / zoomRect.width,
//       viewportHeight / zoomRect.height
//     );

//     // Set the scale and center the view on the adjusted rectangle
//     diagram.scale = Math.min(Math.max(newScale, 0.2), 1); // Set scale within bounds
//     diagram.centerRect(zoomRect);
//   }
// };

const focusOnNodeByKey = (diagram, key) => {
  const node = diagram.findNodeForKey(key);
  if (node) {
    const nodeBounds = node.actualBounds;
    const zoomFactor = 1.2;
    const viewportWidth = diagram.viewportBounds.width;
    const viewportHeight = diagram.viewportBounds.height;

    const zoomRect = nodeBounds
      .copy()
      .inflate(
        nodeBounds.width * (zoomFactor - 1),
        nodeBounds.height * (zoomFactor - 1)
      );
    const newScale = Math.min(
      viewportWidth / zoomRect.width,
      viewportHeight / zoomRect.height
    );

    diagram.scale = Math.min(Math.max(newScale, 0.2), 1);
    diagram.centerRect(zoomRect);
  }
};

const Genogram = (props) => {
  const diagramRef = useRef(null);

  genoData = props.Genogram;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const initDiagramWithModal = useCallback(() => {
    const diagram = initDiagram();
    diagram.model.modelData.showModal = showModal;
    diagram.model.modelData.setData = setData;
    return diagram;
  }, [showModal, setData]);

  const zoomIn = () => {
    const diagram = diagramRef.current?.getDiagram();
    if (diagram) {
      diagram.commandHandler.increaseZoom();
    }
  };

  const zoomOut = () => {
    const diagram = diagramRef.current?.getDiagram();
    if (diagram) {
      diagram.commandHandler.decreaseZoom();
    }
  };

  const fullView = () => {
    const diagram = diagramRef.current?.getDiagram();
    if (diagram) {
      diagram.zoomToFit();
    }
  };

  useEffect(() => {
    const diagram = diagramRef.current?.getDiagram();
    if (diagram) {
      const handleLayoutCompleted = () => {
        focusOnNodeByKey(diagram, "66d97923b3f4dc6c629e7e5b");
      };

      diagram.addDiagramListener("LayoutCompleted", handleLayoutCompleted);

      return () => {
        diagram.removeDiagramListener("LayoutCompleted", handleLayoutCompleted);
      };
    }
  }, [diagramRef]);

  return (
    <>
      <div id="genogram">
        <div className="flex justify-between">
          <div className="ml-3 mb-3 flex gap-4">
            <button
              onClick={zoomIn}
              className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <FaPlus className="text-xl" />
            </button>
            <button
              onClick={zoomOut}
              className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <FaMinus className="text-xl" />
            </button>
            <button
              onClick={fullView}
              className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <BiFullscreen className="text-xl" />
            </button>
          </div>
          <h2>Discover Your Family Tree</h2>
          <div></div>
        </div>
        <ReactDiagram
          initDiagram={initDiagramWithModal}
          divClassName="diagram-component"
          onModelChange={handleModelChange}
          ref={diagramRef}
        />
        <Modal4
          data={data}
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      </div>
    </>
  );
};

export default Genogram;
