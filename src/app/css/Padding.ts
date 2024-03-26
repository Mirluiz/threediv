import { Div } from "../html/Div";

export interface PaddingProps {
  padding: number | string; // top right bottom left back front

  paddingLeft: number | string;
  paddingRight: number | string;
  paddingTop: number | string;
  paddingBottom: number | string;
  paddingBack: number | string;
  paddingFront: number | string;
}


class Padding {
  constructor(readonly div: Div) {}

  compile(){
    if(this.div.style.padding){
      // this.div.children.
    }
  }
}

export Padding