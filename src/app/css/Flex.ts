import { Div } from "../html/Div";
import { DivHelper } from "../html/DivHelper";

export interface FlexProps {
  gap: string | number;
  flex: "";
  flexBasis: "";
  flexGrow: "";
  flewShrink: "";
  flexDirection: "row" | "row-reverse" | "column" | "column-reverse";
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
      this.reposition();

      if (this.div.style.justifyContent) this.justify();
      if (this.div.style.alignItems) this.align();

      this.direction();
    }
  }

  private resize_experimental() {
    let numberDivsWidth = this.div.children.reduce((sum, child) => {
      let res = child.style.width && DivHelper.getVal(child.style.width);

      if (res && !res.percent) {
        return sum + res.val;
      } else return sum;
    }, 0);

    let retainEmptySpace = (this.div.width ?? 1) - numberDivsWidth;

    let percentArray = this.div.children.map((child) => {
      if (child.style.width) {
        let res = DivHelper.getVal(child.style.width);

        if (res.percent) {
          return (this.div.width ?? 1) * (res.val / 100);
        } else {
          return 0;
        }
      } else return 0;
    });

    let percentWidth = percentArray.reduce((sum, child) => sum + child, 0);

    let difference =
      (percentWidth - (retainEmptySpace - (this.div.width ?? 0))) / 2;

    this.div.children.map((child) => {
      let diffPerChild = difference / (percentArray.length + 1);

      if (this.div.width && child.width) {
        let childWidth = 0;

        if (child.style.width && DivHelper.isPercent(child.style.width)) {
          let percent = DivHelper.getVal(child.style.width);

          childWidth = 100 / percent.val + diffPerChild / 2;
          console.log("100 / percent.val", 100 / percent.val);
        } else {
          childWidth = child.width + -diffPerChild / 4;
        }

        child.width = childWidth;
      }
    });
  }

  private resize() {
    let numberDivsWidth = this.div.children.reduce((sum, child) => {
      let res = child.style.width && DivHelper.getVal(child.style.width);

      if (res && !res.percent) {
        return sum + res.val;
      } else return sum;
    }, 0);

    let retainEmptySpace = (this.div.width ?? 1) - numberDivsWidth;

    this.div.children.map((child) => {
      if (this.div.width && child.width) {
        let childWidth = 0;

        if (child.style.width && DivHelper.isPercent(child.style.width)) {
          let percent = DivHelper.getVal(child.style.width);

          childWidth = retainEmptySpace * (percent.val / 100);
        } else {
          childWidth = child.width;
        }

        child.width = childWidth;
      }
    });
  }

  private reposition() {
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
        let emptySpace = (this.div.width ?? 1) - allChildrenWidth;

        this.div.children.map((child, index, arr) => {
          if (!child.position) {
            child.position = { x: 0, y: 0, z: 0 };
          }

          if (this.div.width && child.width) {
            child.position.x =
              -this.div.width / 2 +
              child.width / 2 +
              leftOffset +
              (emptySpace / arr.length) * 0.5;
            leftOffset += child.width + emptySpace / arr.length;
          }
        });
        break;
      }
      case "space-evenly": {
        let emptySpace = (this.div.width ?? 1) - allChildrenWidth;

        this.div.children.map((child, index, arr) => {
          if (!child.position) {
            child.position = { x: 0, y: 0, z: 0 };
          }

          if (this.div.width && child.width) {
            leftOffset += +(emptySpace / (arr.length + 1)).toFixed(4);

            child.position.x =
              -this.div.width / 2 + child.width / 2 + leftOffset;

            leftOffset += child.width;
          }
        });
        break;
      }
      case "space-between": {
        let emptySpace = (this.div.width ?? 1) - allChildrenWidth;

        this.div.children.map((child, index, arr) => {
          if (!child.position) {
            child.position = { x: 0, y: 0, z: 0 };
          }

          if (this.div.width && child.width) {
            child.position.x =
              -this.div.width / 2 + child.width / 2 + leftOffset;
            leftOffset += child.width + emptySpace / (arr.length - 1);
          }
        });

        break;
      }
      case "flex-end": {
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

        break;
      }
      case "flex-start": {
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

  private align() {
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

  private direction() {
    switch (this.div.style.flexDirection) {
      case "column": {
        let topOffset = 0;
        this.div.children.map((child) => {
          if (!child.position) {
            child.position = { x: 0, y: 0, z: 0 };
          }

          if (
            child.width &&
            child.depth &&
            this.div.width &&
            child.style.width
          ) {
            let res = DivHelper.getVal(child.style.width);

            if (res.percent) {
              child.width = this.div.width * (res.val / 100);
            }
          }

          if (this.div.depth && child.depth && this.div.width && child.width) {
            child.position.z =
              -this.div.depth / 2 + child.depth / 2 + topOffset;
            child.position.x = -this.div.width / 2 + child.width / 2;
            topOffset += child.depth;
          }
        });
        break;
      }
      case "column-reverse": {
        let bottomOffset = 0;
        this.div.children.map((child) => {
          if (!child.position) {
            child.position = { x: 0, y: 0, z: 0 };
          }

          if (
            child.width &&
            child.depth &&
            this.div.width &&
            child.style.width
          ) {
            let res = DivHelper.getVal(child.style.width);

            if (res.percent) {
              child.width = this.div.width * (res.val / 100);
            }
          }

          if (this.div.depth && child.depth && this.div.width && child.width) {
            child.position.z =
              this.div.depth / 2 - child.depth / 2 - bottomOffset;
            child.position.x = -this.div.width / 2 + child.width / 2;
            bottomOffset += child.depth;
          }
        });
        break;
      }
      case "row": {
        console.log("not implemented");
        break;
      }
      case "row-reverse": {
        console.log("not implemented");

        break;
      }
      default:
        break;
    }
  }

  private getSize(val: string | number) {
    if (val) {
    }

    return null;
  }
}

export { Flex };
