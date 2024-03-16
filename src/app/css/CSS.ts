import { Div } from "../html/Div";
import { Flex, FlexProps } from "./Flex";
import { MarginProps } from "./Margin";
import { PaddingProps } from "./Padding";

export interface CSSProps extends FlexProps, MarginProps, PaddingProps {
  display: "flex" | "none" | "inline";
  width?: string | number;
  height?: string | number;
  depth?: string | number;
  gap: string | number;
  opacity: number;
  color: string;
}

class CSS {
  flexCompiler: Flex;

  display: "flex" | "inline" | "none" = "flex";

  color?: string;

  constructor(private div: Div) {
    this.flexCompiler = new Flex(this.div);
  }

  compile() {
    if (this.div.style.display === "flex") {
      this.flexCompiler.compile();
    }

    // if (this.div.style.color) {
    // }
  }
}

export { CSS };
