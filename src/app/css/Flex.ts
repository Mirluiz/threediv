import { Div } from "../html/Div";

export interface FlexProps {
  flex: "";
  flexBasis: "";
  flexDirection: "";
  flexGrow: "";
  flewShrink: "";
  flexSirection: "row" | "row-reverse" | "column" | "column-reverse";
  flexWrap: "nowrap" | "wrap" | "wrap-reverse";
  justifyContent:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "start"
    | "end"
    | "left"
    | "right";
  alignItems:
    | "stretch"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "first baseline"
    | "last baseline"
    | "start"
    | "end"
    | "self-start"
    | "self-end";
}

class Flex {
  constructor(private div: Div) {}

  compile() {
    if (this.div.style.display === "flex") {
      let allChildrenWidth = this.div.children.reduce(
        (sum, child) => sum + (child.width ?? 0),
        0,
      );
      let leftOffset = 0;

      switch (this.div.style.justifyContent) {
        case "space-around": {
          break;
        }
        case "space-evenly": {
          break;
        }
        case "space-between": {
          break;
        }
        case "flex-end": {
          {
            this.div.children.map((child) => {
              if (!child.position) {
                child.position = { x: 0, y: 0, z: 0 };
              }

              if (this.div.width && child.width) {
                child.position.x =
                  this.div.width / 2 -
                  allChildrenWidth +
                  child.width / 2 +
                  leftOffset;
                leftOffset += child.width;
              }
            });
          }
          break;
        }
        case "flex-start": {
          {
            this.div.children.map((child) => {
              if (!child.position) {
                child.position = { x: 0, y: 0, z: 0 };
              }

              if (this.div.width && child.width) {
                child.position.x =
                  -this.div.width / 2 + child.width / 2 + leftOffset;
                leftOffset += child.width;
              }
            });
          }
          break;
        }
        case "center": {
          {
            this.div.children.map((child) => {
              if (!child.position) {
                child.position = { x: 0, y: 0, z: 0 };
              }

              if (this.div.width && child.width) {
                child.position.x =
                  -allChildrenWidth / 2 + child.width / 2 + leftOffset;
                leftOffset += child.width;
              }
            });
          }
          break;
        }
      }
    }
  }

  private simpleFlex() {
    let leftOffset = 0;
    this.div.children.map((child) => {
      if (!child.position) {
        child.position = { x: 0, y: 0, z: 0 };
      }

      if (this.div.width && child.width) {
        child.position.x = -this.div.width / 2 + child.width / 2 + leftOffset;
        leftOffset += child.width;
      }
    });
  }

  private rebuildWidth() {}
}

export { Flex };
