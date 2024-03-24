import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import "./../global.css";
import "./../div.css";
import { DivStructure, Engine } from "../app/Engine";
import { Scene } from "../three/Scene";
import { SimpleExamples } from "./Examples/Simple";
import * as THREE from "three";

const App = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let simpleContainer = new SimpleExamples();

    let divApp = new Engine({
      div: simpleContainer.get(),
    });

    if (canvasRef.current) {
      let scene = new Scene({ canvas: canvasRef.current });
      let divs = divApp.getDivs();

      let meshes = generateMesh(divs);

      let final = divApp.setup(meshes);
      scene.scene.add(final);

      scene.animate();
    }
  }, []);

  const generateMesh = (divStructure: DivStructure) => {
    let ret = getBox(divStructure);

    const runTree = (div: DivStructure, mesh: THREE.Object3D) => {
      let box = getBox(div);

      mesh.add(box);
      if (div.children) {
        div.children.map((child) => {
          runTree(child, box);
        });
      }
    };

    if (divStructure.children) {
      divStructure.children.map((child) => {
        runTree(child, ret);
      });
    }

    return ret;
  };

  const getBox = (divStructure: DivStructure) => {
    if (!divStructure.style.opacity) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const edge = new THREE.EdgesGeometry(geometry);

      const material = new THREE.LineBasicMaterial({
        color: divStructure.style.color ?? "black",
        transparent: true,
        opacity: 0.5,
      });

      return new THREE.LineSegments(edge, material);
    } else {
      const geometry = new THREE.BoxGeometry();

      const material = new THREE.LineBasicMaterial({
        color: divStructure.style.color ?? "black",
        transparent: true,
        opacity: divStructure.style.opacity,
      });

      return new THREE.Mesh(geometry, material);
    }
  };

  return (
    <Grid style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Grid
        style={{ width: "50%", height: "100%", outline: "1px solid black" }}
        ref={(r) => {
          canvasRef.current = r;
        }}
      ></Grid>
      <Grid className="divPlayground" style={{ width: "50%", height: "100%" }}>
        <div id="container">
          <div id="child1"></div>
          <div id="child2"></div>
          <div id="child3"></div>
        </div>
      </Grid>
    </Grid>
  );
};

export { App };
