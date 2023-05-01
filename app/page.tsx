"use client";

import WebGPU from "../three/addons/jsm/capabilities/WebGPU.js";
import WebGPURenderer from "../three/addons/jsm/renderers/webgpu/WebGPURenderer.js";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ThreeBox from "../components/ThreeBox";
import { useState } from "react";

export default function Home() {
  const [frameloop, setFrameLoop] =
    useState<"never" | "always" | "demand" | undefined>("never");

  return (
    <main>
      <Canvas
        frameloop={frameloop}
        gl={(canvas) => {
          const renderer = new WebGPURenderer({ canvas });
          renderer.init().then(() => setFrameLoop("always"));
          return renderer;
        }}
      >
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <ThreeBox position={[-1.2, 0, 0]} />
        <ThreeBox position={[1.2, 0, 0]} />
      </Canvas>
    </main>
  );
}
