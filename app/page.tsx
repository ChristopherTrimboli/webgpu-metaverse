"use client";

import WebGPU from "../three/addons/jsm/capabilities/WebGPU.js";
import WebGPURenderer from "../three/addons/jsm/renderers/webgpu/WebGPURenderer.js";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ThreeBox from "../components/ThreeBox";

export default function Home() {
  return (
    <main>
      <Canvas
        gl={(canvas) => new WebGPURenderer({ canvas })}
        frameloop="never"
        onCreated={async (state) => {
          await (state.gl as any).init();
          state.set({ frameloop: "always" });
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
