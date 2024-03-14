import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Vector3 } from "three";
import Stats from "three/examples/jsm/libs/stats.module";

class Scene {
  stats: Stats;

  camera: THREE.OrthographicCamera | THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  axis: THREE.AxesHelper;
  controls: OrbitControls;
  intersected: boolean = false;
  pointer: THREE.Vector3;

  raycaster: THREE.Raycaster;
  htmlElement: HTMLElement | null;

  constructor(props: { canvas: HTMLElement }) {
    const { canvas } = props;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setClearColor(0xffffff);

    this.axis = new THREE.AxesHelper(400);

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector3();

    this.htmlElement = canvas;

    this.renderer.setSize(
      this.htmlElement.clientWidth,
      this.htmlElement.clientHeight,
    );
    this.htmlElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      30,
      this.htmlElement.clientWidth / this.htmlElement.clientHeight,
      0.1,
      100,
    );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.updateMatrix();
    this.controls.update();

    this.scene = new THREE.Scene();

    const axis = new THREE.AxesHelper(20);
    this.scene.add(axis);

    const netSize = 50;
    const helper = new THREE.GridHelper(netSize, netSize);
    this.scene.add(helper);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    this.scene.add(ambientLight);

    const hLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    hLight.position.set(1, 2, 0);

    this.renderer.domElement.setAttribute("tabindex", "0");
    this.renderer.domElement.focus();

    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.useLegacyLights = false;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.toneMappingExposure = 1;

    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.stats = new Stats();

    this.setCamera("3D");
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }

  setCamera(mode: "2D" | "3D") {
    if (!this.htmlElement) return;

    let pos = { ...this.camera.position };
    let zoom = 1;

    this.controls.reset();

    this.camera = new THREE.PerspectiveCamera(
      30,
      this.htmlElement.clientWidth / this.htmlElement.clientHeight,
      0.1,
      100,
    );

    this.camera.position.set(pos.x, 10, pos.z);

    if (this.controls) {
      this.controls.minPolarAngle = 0;
      this.controls.maxPolarAngle = Math.PI;
    }
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(pos.x, 0, pos.z);
    this.controls.update();

    this.camera.position.setX(pos.x);
    this.camera.position.setZ(pos.z);

    this.camera.zoom = zoom;

    this.controls.minDistance = 0.1;
    this.controls.maxDistance = 100;

    this.camera.updateMatrix();
    this.controls.update();
  }
}

export { Scene };
