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

    if ("geometry" in mesh) {
      if (this.div.position) {
        let { geometry } = mesh;

        if (this.isGeometry(geometry)) {
          var scaleFactorX = this.div.width ?? 1; // Change as needed
          var scaleFactorY = this.div.height ?? 1;
          var scaleFactorZ = this.div.depth ?? 1;

          geometry.scale(scaleFactorX, scaleFactorY, scaleFactorZ);
        }
      }
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

      if ("geometry" in mesh) {
        if (div.position) {
          let { geometry } = mesh;

          if (this.isGeometry(geometry)) {
            var scaleFactorX = div.width ?? 1; // Change as needed
            var scaleFactorY = div.height ?? 1;
            var scaleFactorZ = div.depth ?? 1;

            geometry.scale(scaleFactorX, scaleFactorY, scaleFactorZ);
          }
        }
      }

      if (div?.children && mesh.children) {
        this.runTreeSetup(mesh.children, div.children);
      }
    });
  }

  private isGeometry(obj: any): obj is THREE.BufferGeometry {
    return "isBufferGeometry" in obj;
  }
}

export { Engine };
