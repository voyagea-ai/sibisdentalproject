"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, Group } from "three";

/**
 * A calm, abstract dental form rendered in real time. Rotates slowly and drifts
 * with a gentle float. Intentionally abstract and non-graphic. R3F is used only
 * here, where real-time 3D genuinely adds to the experience.
 */
function Form() {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.28;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
    }
    if (core.current) {
      core.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <group ref={group}>
      {/* Pearlescent crown-like core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color="#EEEAE1"
          metalness={0.35}
          roughness={0.28}
          emissive="#c8b38a"
          emissiveIntensity={0.08}
        />
      </mesh>
      {/* Fine champagne ring */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.7, 0.012, 16, 120]} />
        <meshStandardMaterial color="#c8b38a" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function ScrollTooth() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} color="#fff6e8" />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#a9cad2" />
      <Form />
    </Canvas>
  );
}
