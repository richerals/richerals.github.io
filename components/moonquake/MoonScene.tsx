"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { APOLLO_STATIONS } from "@/lib/moonquake/eventTypes";
import { MoonMarkers, StationMarkers } from "./MoonMarkers";
import { SRGBColorSpace } from "three";

const MOON_RADIUS = 2;

function MoonBody() {
  const albedo = useTexture("/moonquake/moon.jpg");
  albedo.colorSpace = SRGBColorSpace;
  return (
    <mesh>
      <sphereGeometry args={[MOON_RADIUS, 96, 96]} />
      <meshStandardMaterial
        map={albedo}
        color="#ffffff"
        roughness={0.98}
        metalness={0.02}
      />
    </mesh>
  );
}

export function MoonScene() {
  const controlsRef = useRef<any>(null);

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded border border-border bg-[#050608] lg:h-[560px]">
      <button
        type="button"
        onClick={() => controlsRef.current?.reset()}
        className="absolute right-3 top-3 z-10 rounded border border-border bg-bg/80 px-3 py-1.5 text-xs text-text backdrop-blur hover:border-muted"
      >
        Reset View
      </button>
      <Canvas camera={{ position: [0, 0.4, 5.6], fov: 45 }}>
        <color attach="background" args={["#050608"]} />
        <ambientLight intensity={0.18} color="#cfd8e8" />
        <hemisphereLight args={["#dfe7f5", "#111927", 0.22]} />
        <directionalLight position={[8, 2, 2.5]} intensity={1.05} color="#f5f8ff" />
        <pointLight position={[-5, -1.5, -3.5]} intensity={0.22} color="#7898c9" />
        <Stars radius={40} depth={40} count={1000} factor={3} saturation={0} fade speed={0.4} />
        <MoonBody />
        <MoonMarkers sphereRadius={MOON_RADIUS} />
        <StationMarkers sphereRadius={MOON_RADIUS} stations={APOLLO_STATIONS} />
        <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.08} minDistance={3.2} maxDistance={9} />
      </Canvas>
    </div>
  );
}
