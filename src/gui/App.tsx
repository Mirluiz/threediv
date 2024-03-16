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
      style: { width: "20%", height: 3, depth: 2, color: "red", opacity: 0.5 },
    };

    let child2Child1 = {
      style: { width: "30%", height: 2, depth: 2, color: "blue", opacity: 1 },
    };
    let child2Child2 = {
      style: { width: "70%", height: 2, depth: 2, color: "green", opacity: 1 },
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
        justifyContent: "center",
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
    <Grid
      style={{ width: "100vw", height: "100vh", border: "1px solid black" }}
      ref={(r) => {
        canvasRef.current = r;
      }}
    ></Grid>
  );
};

export { App };
