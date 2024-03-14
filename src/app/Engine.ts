import { CSSProps } from "./css/CSS";
import { Div, DivProps } from "./html/Div";
import * as THREE from "three";

export interface DivStructure {
  style: Partial<CSSProps>;
  children?: Array<DivStructure>;
}

class Engine {
  divStructure: DivStructure;
  div: Div;

  constructor(props: { div: DivStructure }) {
    this.divStructure = props.div;

    this.div = new Div(props.div.style);

    if (props.div.children) {
      props.div.children.map((child) => {
        this.runTree(this.div, child);
      });
    }
  }

  private runTree(div: Div, divStructure: DivStructure) {
    let newDiv = new Div(divStructure.style);
    div.children.push(newDiv);

    newDiv.parent = div;

    if (divStructure.children) {
      divStructure.children.map((child) => {
        this.runTree(newDiv, child);
      });
    }
  }

  getDivs() {
    this.div.compile();
    return this.div;
  }

  setup(mesh: THREE.Object3D) {
    if (this.div.position) {
      mesh.position.x = this.div.position.x;
      mesh.position.y = this.div.position.y;
      mesh.position.z = this.div.position.z;
    }

    if (this.div.position) {
      let newGeometry = new THREE.BoxGeometry(
        this.div.width,
        this.div.height,
        this.div.depth,
      );
      const edge = new THREE.EdgesGeometry(newGeometry);

      mesh.geometry.dispose();
      mesh.geometry = edge;
    }

    if (this.div.children && mesh.children) {
      this.runTreeSetup(mesh.children, this.div.children);
    }

    return mesh;
  }

  private runTreeSetup(
    children: Array<THREE.Object3D>,
    divChildren: Array<Div>,
  ) {
    children.map((mesh, index, array) => {
      const div = divChildren[index];

      if (div?.position) {
        mesh.position.x = div.position.x;
        mesh.position.y = div.position.y;
        mesh.position.z = div.position.z;
      }

      if (div?.position) {
        let newGeometry = new THREE.BoxGeometry(
          div.width,
          div.height,
          div.depth,
        );
        const edge = new THREE.EdgesGeometry(newGeometry);

        mesh.geometry.dispose();
        mesh.geometry = edge;
      }

      if (div?.children && mesh.children) {
        this.runTreeSetup(mesh.children, div.children);
      }
    });
  }
}

export { Engine };
