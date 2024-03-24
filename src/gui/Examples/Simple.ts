import { CSS } from "../../app/css/CSS";
import { DivProps } from "../../app/html/Div";

class SimpleExamples {
  example1() {
    let container: DivProps = {
      style: {
        width: 3,
        height: 1,
        depth: 3,
        display: "flex",
        justifyContent: "space-evenly",
        // justifyContent: "space-around",
        alignItems: "center",
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

    let child4: DivProps = {
      style: {
        width: 0.05,
        height: "100%",
        depth: 1,
        color: "purple",
        opacity: 1,
      },
    };

    container.children = [child1, child2, child3];

    return container;
  }

  example2() {
    let container: DivProps = {
      style: {
        width: 3,
        height: 1,
        depth: 3,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
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

    container.children = [child1];

    return container;
  }

  example3() {
    let container: DivProps = {
      style: {
        width: 3,
        height: 1,
        depth: 3,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
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

    container.children = [child1];

    return container;
  }

  get() {
    return this.example1();
  }
}

export { SimpleExamples };
