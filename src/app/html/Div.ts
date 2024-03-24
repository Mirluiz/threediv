import { Css } from "@mui/icons-material";
import { CSS, CSSProps } from "../css/CSS";
import { DivHelper } from "./DivHelper";

export interface DivProps {
  style?: Partial<CSSProps>;
  children?: Array<DivProps>;
}

class Div implements DivProps {
  private css: CSS;
  style: Partial<CSSProps> = {
    display: "block",
  };

  width?: number;
  height?: number;
  depth?: number;
  position?: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };

  children: Array<Div> = [];
  parent: Div | null = null;

  constructor(props: Partial<CSSProps>) {
    Object.entries(props).map((key) => {
      // @ts-ignore
      this.style[key[0] as keyof CSSProps] = key[1];
    });

    this.css = new CSS(this);
  }

  private resize() {
    this.resizeWidth();
    this.resizeHeight();
    this.resizeDepth();
  }

  private reposition() {
    let topOffset = 0;

    this.children.map((child) => {
      if (!child.position) {
        child.position = { x: 0, y: 0, z: 0 };
      }

      if (this.width && child.width) {
        child.position.x = -this.width / 2 + child.width / 2;
      }

      if (this.depth && child.depth) {
        child.position.z = -this.depth / 2 + topOffset + child.depth / 2;
        topOffset += child.depth;
      }
    });
  }

  compile() {
    this.resize();

    this.children?.map((child) => {
      child.compile();
    });

    this.reposition();

    this.css.compile();
  }

  private resizeWidth() {
    let safeWidth = 0;

    if (this.parent) {
      if (typeof this.style?.width === "string") {
        let percentWidth = DivHelper.isPercent(this.style.width)
          ? DivHelper.getPercent(this.style.width)
          : false;

        if (percentWidth) {
          safeWidth = this.parent.getWidth() * (percentWidth / 100);
        }
      } else if (typeof this.style?.width === "number") {
        safeWidth = this.style.width;
      }
    } else {
      if (typeof this.style?.width === "number") {
        safeWidth = this.style.width;
      }
    }

    this.width = safeWidth;
  }

  private resizeHeight() {
    let safeHeight = 0;

    if (this.parent) {
      if (typeof this.style?.height === "string") {
        let percentHeight = DivHelper.isPercent(this.style.height)
          ? DivHelper.getPercent(this.style.height)
          : false;

        if (percentHeight) {
          safeHeight = this.parent.getHeight() * (percentHeight / 100);
        }
      } else if (typeof this.style?.height === "number") {
        safeHeight = this.style.height;
      }
    } else {
      if (typeof this.style?.height === "number") {
        safeHeight = this.style.height;
      }
    }

    this.height = safeHeight;
  }

  private resizeDepth() {
    let safeDepth = 0;

    if (this.parent) {
      if (typeof this.style?.depth === "string") {
        let percentDepth = DivHelper.isPercent(this.style.depth)
          ? DivHelper.getPercent(this.style.depth)
          : false;

        if (percentDepth) {
          safeDepth = this.parent.getDepth() * (percentDepth / 100);
        }
      } else if (typeof this.style?.depth === "number") {
        safeDepth = this.style.depth;
      }
    } else {
      if (typeof this.style?.depth === "number") {
        safeDepth = this.style.depth;
      }
    }

    this.depth = safeDepth;
  }

  private getWidth(): number {
    let safeWidth = 0;

    if (this.parent) {
      if (typeof this.style?.width === "string") {
        let percentWidth = DivHelper.isPercent(this.style.width)
          ? DivHelper.getPercent(this.style.width)
          : false;

        if (percentWidth) {
          safeWidth = this.parent.getWidth() * (percentWidth / 100);
        }
      } else if (typeof this.style?.width === "number") {
        safeWidth = this.style.width;
      }
    } else {
      if (typeof this.style?.width === "number") {
        safeWidth = this.style.width;
      }
    }

    return safeWidth;
  }

  private getHeight(): number {
    let safeHeight = 0;

    if (this.parent) {
      if (typeof this.style?.height === "string") {
        let percentHeight = DivHelper.isPercent(this.style.height)
          ? DivHelper.getPercent(this.style.height)
          : false;

        if (percentHeight) {
          safeHeight = this.parent.getHeight() * (percentHeight / 100);
        }
      } else if (typeof this.style?.height === "number") {
        safeHeight = this.style.height;
      }
    } else {
      if (typeof this.style?.height === "number") {
        safeHeight = this.style.height;
      }
    }

    return safeHeight;
  }

  private getDepth(): number {
    let safeDepth = 0;

    if (this.parent) {
      if (typeof this.style?.depth === "string") {
        let percentDepth = DivHelper.isPercent(this.style.depth)
          ? DivHelper.getPercent(this.style.depth)
          : false;

        if (percentDepth) {
          safeDepth = this.parent.getDepth() * (percentDepth / 100);
        }
      } else if (typeof this.style?.depth === "number") {
        safeDepth = this.style.depth;
      }
    } else {
      if (typeof this.style?.depth === "number") {
        safeDepth = this.style.depth;
      }
    }

    return safeDepth;
  }
}

export { Div };
