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
  const cssDiv = useRef<HTMLDivElement | null>(null);

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

    generateDivNet();
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

  const generateDivNet = () => {
    if (cssDiv.current) {
      let _i = 0;
      let _max = 300 / 10;
      while (_i < _max) {
        let horizontalDiv = document.createElement("div");
        horizontalDiv.className = "horizontalDiv";
        horizontalDiv.style.position = "absolute";
        horizontalDiv.style.background = "black";
        horizontalDiv.style.height = "1px";
        horizontalDiv.style.width = "300px";
        horizontalDiv.style.top = `${-1 + _i * 10}px`;
        horizontalDiv.style.left = `0`;
        horizontalDiv.style.right = `0`;
        horizontalDiv.style.zIndex = `-1`;

        let verticalDiv = document.createElement("div");
        verticalDiv.className = "verticalDiv";
        verticalDiv.style.position = "absolute";
        verticalDiv.style.background = "black";
        verticalDiv.style.height = "300px";
        verticalDiv.style.width = "1px";
        verticalDiv.style.top = `0`;
        verticalDiv.style.left = `${-1 + _i * 10}px`;
        verticalDiv.style.zIndex = `-1`;

        cssDiv.current.appendChild(horizontalDiv);
        cssDiv.current.appendChild(verticalDiv);

        _i++;
      }
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
        <div id="container" ref={cssDiv}>
          <div id="child1"></div>
          <div id="child2"></div>
          <div id="child3"></div>
        </div>
      </Grid>
    </Grid>
  );
};

export { App };
