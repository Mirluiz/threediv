import { CSS } from "../../app/css/CSS";
import { DivProps } from "../../app/html/Div";

class SimpleExamples {
  get() {
    let container: DivProps = {
      style: {
        width: 3,
        height: 1,
        depth: 3,
        display: "flex",
        // justifyContent: "flex-end",
        // // alignItems: "flex-end",
        // alignItems: "flex-start",
      },
    };

    let child1: DivProps = {
      style: {
        width: 0.5,
        height: "100%",
        depth: 0.1,
        color: "blue",
        opacity: 1,
      },
    };

    let child2: DivProps = {
      style: {
        width: 1,
        height: "100%",
        depth: 1,
        color: "red",
        opacity: 1,
      },
    };

    let child3: DivProps = {
      style: {
        width: 0.4,
        height: "100%",
        depth: 1,
        color: "green",
        opacity: 1,
      },
    };

    container.children = [child1, child2, child3];

    // let child1FrontChild: DivProps = {
    //   style: { width: "100%", height: 3, depth: 2, color: "red", opacity: 0.5 },
    // };

    // let child1MiddleChild: DivProps = {
    //   style: { width: "20%", height: 3, depth: 2, color: "red", opacity: 0.5 },
    // };

    // let child1BackChild: DivProps = {
    //   style: { width: "20%", height: 3, depth: 2, color: "red", opacity: 0.5 },
    // };

    return container;
  }
}

export { SimpleExamples };
