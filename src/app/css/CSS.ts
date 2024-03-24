import { Div } from "../html/Div";
import { Flex, FlexProps } from "./Flex";
import { MarginProps } from "./Margin";
import { PaddingProps } from "./Padding";

// TODO: change string | number to value class
export interface CSSProps extends FlexProps, MarginProps, PaddingProps {
  display: "flex" | "none" | "block";
  width?: string | number;
  height?: string | number;
  depth?: string | number;
  gap: string | number;
  opacity: number;
  color: string;
}

class CSS {
  flexCompiler: Flex;

  display: "flex" | "block" | "none" = "block";

  color?: string;

  constructor(private div: Div) {
    this.flexCompiler = new Flex(this.div);
  }

  compile() {
    if (this.div.style.display === "flex") {
      this.flexCompiler.compile();
    }
  }
}

export { CSS };
