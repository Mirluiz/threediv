import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import "./../global.css";
import { DivStructure, Engine } from "../app/Engine";
import { Scene } from "../three/Scene";
import * as THREE from "three";

const App = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let childBox1 = {
      style: { width: "20%", height: 3, depth: 2, color: "red" },
    };

    let child2Child1 = {
      style: { width: "10%", height: 2, depth: 2, color: "blue" },
    };
    let child2Child2 = {
      style: { width: "10%", height: 2, depth: 2, color: "green" },
    };

    let childBox2 = {
      style: {
        width: "50%",
        height: 2,
        depth: 2,
        display: "flex",
        justifyContent: "flex-end",
      },
      children: [child2Child1, child2Child2],
    };

    let parentBox = {
      style: {
        width: 6,
        height: 2,
        depth: 4,
        display: "flex",
        justifyContent: "flex-end",
      },
      children: [childBox1, childBox2],
    };

    let divApp = new Engine({
      div: parentBox,
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
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const edge = new THREE.EdgesGeometry(geometry);

    const material = new THREE.LineBasicMaterial({
      color: divStructure.style.color ?? "black",
      transparent: true,
      opacity: 0.5,
    });

    const ret = new THREE.LineSegments(edge, material);

    const runTree = (div: DivStructure, mesh: THREE.Object3D) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const edge = new THREE.EdgesGeometry(geometry);

      const material = new THREE.LineBasicMaterial({
        color: div.style.color ?? "black",
        transparent: true,
        opacity: 0.5,
      });

      const box = new THREE.LineSegments(edge, material);
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

  return (
    <Grid
      style={{ width: "100vw", height: "100vh", border: "1px solid black" }}
      ref={(r) => {
        canvasRef.current = r;
      }}
    ></Grid>
  );
};

export { App };
