"use client";

import { useEffect, useState } from "react";
import {
  Scene,
  PerspectiveCamera,
  LinearToneMapping,
  Object3D,
  MeshBasicMaterial,
  InstancedMesh,
  SphereGeometry,
} from "three";

import WebGPU from "../three/addons/jsm/capabilities/WebGPU.js";
import WebGPURenderer from "../three/addons/jsm/renderers/webgpu/WebGPURenderer.js";
import { OrbitControls } from "../three/addons/jsm/controls/OrbitControls.js";
import { toneMapping } from "../three/addons/jsm/nodes/Nodes";

export default function Home() {
  useEffect(() => {
    let camera: PerspectiveCamera, scene: Scene, renderer: WebGPURenderer;

    const container = document.createElement("div");
    document.body.appendChild(container);

    camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      20
    );
    camera.position.set(-1.8, 0.6, 2.7);

    scene = new Scene();

    renderer = new WebGPURenderer();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMappingNode = toneMapping(LinearToneMapping, 1);
    renderer.setAnimationLoop(render);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 10;

    let mesh: InstancedMesh;
    const amount = parseInt(window.location.search.slice(1)) || 10;
    const count = Math.pow(amount, 3);
    const dummy = new Object3D();

    const material = new MeshBasicMaterial();
    const geometry = new SphereGeometry(0.25, 4, 4);

    mesh = new InstancedMesh(geometry, material, count);

    scene.add(mesh);

    window.addEventListener("resize", onWindowResize);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function render() {
      if (mesh) {
        const time = Date.now() * 0.001;

        mesh.rotation.x = Math.sin(time / 4);
        mesh.rotation.y = Math.sin(time / 2);

        let i = 0;
        const offset = (amount - 1) / 2;

        for (let x = 0; x < amount; x++) {
          for (let y = 0; y < amount; y++) {
            for (let z = 0; z < amount; z++) {
              dummy.position.set(offset - x, offset - y, offset - z);
              dummy.rotation.y =
                Math.sin(x / 4 + time) +
                Math.sin(y / 4 + time) +
                Math.sin(z / 4 + time);
              dummy.rotation.z = dummy.rotation.y * 2;

              dummy.updateMatrix();

              mesh.setMatrixAt(i++, dummy.matrix);
            }
          }
        }
      }

      renderer.render(scene, camera);
    }
  });

  return <main></main>;
}
