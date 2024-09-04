import {
  CORNER_ROUNDNESS,
  genderProperty,
  IMAGE_DIAMETER,
  IMAGE_TOP_MARGIN,
  nameProperty,
  statusProperty,
  STROKE_WIDTH,
  theme,
} from "./tree-variables";
import * as go from "gojs";

export const onMouseEnterPart = (e, part) => {
  if (!part.isSelected) {
    part.isHovered = true; // Set hover state
    if (!part.isHighlighted) {
      part.isHighlighted = false; // Ensure highlight is not set on hover
    }
  }
};

export const onMouseLeavePart = (e, part) => {
  part.isHovered = false; // Clear hover state
  if (!part.isSelected) {
    part.isHighlighted = false; // Ensure highlight is cleared on leave
  }
};

export const onSelectionChange = (part) => {
  part.isHighlighted = part.isSelected; // Update highlight based on selection
};

export const strokeStyle = (shape) => {
  return shape
    .set({
      fill: theme.colors.personNodeBackground,
      strokeWidth: STROKE_WIDTH,
    })
    .bind("stroke", statusProperty, (status) => getStrokeForStatus(status))
    .bindObject("stroke", "isHighlighted", (isHighlighted, obj) =>
      isHighlighted
        ? "red" // Set stroke color to red when highlighted
        : getStrokeForStatus(obj.part.data.status)
    )
    .bindObject("stroke", "isHovered", (isHovered, obj) =>
      isHovered
        ? theme.colors.hoverStroke // Customize hover stroke color if needed
        : getStrokeForStatus(obj.part.data.status)
    );
};

export const genderToText = (gender) => (gender === "male" ? "MALE" : "FEMALE");

export const genderToTextColor = (gender) =>
  gender === "male" ? theme.colors.maleBadgeText : theme.colors.femaleBadgeText;

export const genderToFillColor = (gender) =>
  gender === "male"
    ? theme.colors.maleBadgeBackground
    : theme.colors.femaleBadgeBackground;


export const personBadge = () =>
  new go.Panel("Auto", {
    alignmentFocus: go.Spot.TopRight,
    alignment: new go.Spot(1, 0, -25, STROKE_WIDTH - 0.5),
  }).add(
    new go.Shape({
      figure: "RoundedRectangle",
      parameter1: CORNER_ROUNDNESS,
      parameter2: 4 | 8, // round only the bottom
      desiredSize: new go.Size(NaN, 22.5),
      stroke: null,
    }).bind("fill", genderProperty, genderToFillColor),
    new go.TextBlock({
      font: theme.fonts.badgeFont,
    })
      .bind("stroke", genderProperty, genderToTextColor)
      .bind("text", genderProperty, genderToText)
  );

export const personBirthDeathTextBlock = () =>
  new go.TextBlock({
    stroke: theme.colors.personText,
    font: theme.fonts.birthDeathFont,
    alignmentFocus: go.Spot.Top,
    alignment: new go.Spot(0.5, 1, 0, -35),
  }).bind("text", "", ({ born, death }) => {
    if (!born) return "";
    return `${born} - ${death ?? ""}`;
  });

// Panel to display the number of children a node has
export const personCounter = () =>
  new go.Panel("Auto", {
    visible: false,
    alignmentFocus: go.Spot.Center,
    alignment: go.Spot.Bottom,
  })
    .bindObject("visible", "", (obj) => obj.findLinksOutOf().count > 0)
    .add(
      new go.Shape("Circle", {
        desiredSize: new go.Size(29, 29),
        strokeWidth: STROKE_WIDTH,
        stroke: theme.colors.counterBorder,
        fill: theme.colors.counterBackground,
      }),
      new go.TextBlock({
        alignment: new go.Spot(0.5, 0.5, 0, 1),
        stroke: theme.colors.counterText,
        font: theme.fonts.counterFont,
        textAlign: "center",
      }).bindObject("text", "", (obj) => obj.findNodesOutOf().count)
    );

export const pictureStyle = (pic) => {
  return pic
    .bind("source", "", ({ gender }) => {
      return gender === "male"
        ? "./images/male-civilian.svg"
        : "./images/female-civilian.svg";
    })
    .bind("desiredSize", "status", () => new go.Size(24, 24));
};


export const personImage = () =>
  new go.Panel("Spot", {
    alignmentFocus: go.Spot.Top,
    alignment: new go.Spot(0, 0, STROKE_WIDTH / 2, IMAGE_TOP_MARGIN),
  }).add(
    new go.Shape({
      figure: "Circle",
      desiredSize: new go.Size(IMAGE_DIAMETER, IMAGE_DIAMETER),
    }).apply(strokeStyle),
    new go.Picture({ scale: 0.9 }).apply(pictureStyle)
  );

export const personMainShape = () =>
  new go.Shape({
    figure: "RoundedRectangle",
    desiredSize: new go.Size(215, 110),
    portId: "",
    parameter1: CORNER_ROUNDNESS,
  }).apply(strokeStyle);

export const personNameTextBlock = () =>
  new go.TextBlock({
    stroke: theme.colors.personText,
    font: theme.fonts.nameFont,
    desiredSize: new go.Size(160, 50),
    overflow: go.TextOverflow.Ellipsis,
    textAlign: "center",
    verticalAlignment: go.Spot.Center,
    toolTip: go.GraphObject.build("ToolTip").add(
      new go.TextBlock({ margin: 4 }).bind("text", nameProperty)
    ),
    alignmentFocus: go.Spot.Top,
    alignment: new go.Spot(0.5, 0, 0, 25),
  }).bind("text", nameProperty);

export const createLinkTemplate = () =>
  new go.Link({
    selectionAdorned: false,
    routing: go.Routing.Orthogonal,
    layerName: "Background",
    mouseEnter: onMouseEnterPart,
    mouseLeave: onMouseLeavePart,
  }).add(
    new go.Shape({
      stroke: theme.colors.link,
      strokeWidth: 1,
    })
      .bindObject("stroke", "isHighlighted", (isHighlighted) =>
        isHighlighted ? theme.colors.selectionStroke : theme.colors.link
      )
      .bindObject("stroke", "isSelected", (selected) =>
        selected ? theme.colors.selectionStroke : theme.colors.link
      )
      .bindObject("strokeWidth", "isSelected", (selected) => (selected ? 2 : 1))
  );

export const createNodeTemplate = (onNodeClick) =>
  new go.Node("Spot", {
    selectionAdorned: false,
    mouseEnter: onMouseEnterPart,
    mouseLeave: onMouseLeavePart,
    selectionChanged: onSelectionChange,
    click: (e, node) => {
      const parentID = node.data._id;
      if (onNodeClick) {
        onNodeClick(parentID);
      }
    },
  }).add(
    new go.Panel("Spot").add(
      personMainShape(),
      personNameTextBlock(),
      personBirthDeathTextBlock()
    ),
    personBadge()
  );

