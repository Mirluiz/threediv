import { Div } from "../html/Div";
import { DivHelper } from "../html/DivHelper";

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
      this.resize();

      if (this.div.style.justifyContent) this.justify();
      if (this.div.style.alignItems) this.align();
    }
  }

  private resize() {
    let arr = this.div.children.map((child) => {
      if (child.style.width) {
        let res = DivHelper.getVal(child.style.width);

        if (res.percent) {
          return (this.div.width ?? 1) * res.val;
        } else {
          return res.val;
        }
      }
    });

    let leftOffset = 0;
    this.div.children.map((child) => {
      if (!child.position) {
        child.position = { x: 0, y: 0, z: 0 };
      }

      if (this.div.width && child.width) {
        child.position.x = -this.div.width / 2 + leftOffset + child.width / 2;
        leftOffset += child.width;
      }

      if (this.div.depth && child.depth) {
        child.position.z = -this.div.depth / 2 + child.depth / 2;
      }
    });
  }

  private justify() {
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

        break;
      }
    }
  }

  protected align() {
    let allChildrenDepth = this.div.children.reduce(
      (sum, child) => sum + (child.depth ?? 0),
      0,
    );
    let topOffset = 0;

    switch (this.div.style.alignItems) {
      case "flex-end": {
        {
          this.div.children.map((child) => {
            if (!child.position) {
              child.position = { x: 0, y: 0, z: 0 };
            }

            if (this.div.depth && child.depth) {
              child.position.z = this.div.depth / 2 - child.depth / 2;
            }
          });
        }
        break;
      }
      case "flex-start": {
        this.div.children.map((child) => {
          if (!child.position) {
            child.position = { x: 0, y: 0, z: 0 };
          }

          if (this.div.depth && child.depth) {
            child.position.z = -this.div.depth / 2 + child.depth / 2;
          }
        });

        break;
      }
      case "center": {
        this.div.children.map((child) => {
          if (!child.position) {
            child.position = { x: 0, y: 0, z: 0 };
          }

          if (this.div.depth && child.depth) {
            child.position.z = 0;
          }
        });

        break;
      }
    }
  }

  private getSize(val: string | number) {
    if (val) {
    }

    return null;
  }
}

export { Flex };
