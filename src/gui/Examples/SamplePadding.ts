import { CSS } from "../../app/css/CSS";
import { DivProps } from "../../app/html/Div";

class SimplePadding {
  example() {
    let container: DivProps = {
      style: {
        width: 3,
        height: 1,
        depth: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    };

    let child1: DivProps = {
      style: {
        width: 1,
        height: "100%",
        depth: 1,
        color: "red",
        padding: 0.1,
      },
      children: [
        {
          style: {
            width: 0.5,
            height: "100%",
            depth: 0.5,
            color: "blue",
            opacity: 1,
          },
        },
      ],
    };

    container.children = [child1];

    return container;
  }

  get() {
    return this.example();
  }
}

export { SimplePadding };
