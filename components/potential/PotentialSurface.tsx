"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useSimulation } from "@/context/SimulationContext";
import { potentialAt } from "@/lib/potential";

const GRID = 56;
const DEFAULT_CAM = { position: [2.8, 2.4, 2.8] as [number, number, number], fov: 48 };

function colormap(t: number): THREE.Color {
  const c = new THREE.Color();
  c.setHSL(0.58 - t * 0.45, 0.72, 0.32 + t * 0.28);
  return c;
}

function SurfaceMesh({ onRange }: { onRange: (min: number, max: number) => void }) {
  const { magnets, params, potentialMode, plotRange, version } = useSimulation();
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const { xMin, xMax, yMin, yMax } = plotRange;
    const width = xMax - xMin;
    const height = yMax - yMin;
    const geo = new THREE.PlaneGeometry(width, height, GRID, GRID);
    const pos = geo.attributes.position;
    const samples: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < pos.count; i++) {
      const lx = pos.getX(i);
      const ly = pos.getY(i);
      const wx = xMin + (lx + width / 2);
      const wy = yMin + (ly + height / 2);
      const u = potentialAt(wx, wy, magnets, params, potentialMode);
      samples.push(u);
      pos.setZ(i, u * 0.22);
    }

    const uMin = Math.min(...samples);
    const uMax = Math.max(...samples);
    onRange(uMin, uMax);

    for (let i = 0; i < pos.count; i++) {
      const t = (samples[i] - uMin) / (uMax - uMin + 1e-9);
      const c = colormap(t);
      colors.push(c.r, c.g, c.b);
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, 0, 0);
    geo.computeVertexNormals();
    return geo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magnets, params, potentialMode, plotRange, version]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial vertexColors side={THREE.DoubleSide} metalness={0.1} roughness={0.65} />
    </mesh>
  );
}

function CameraReset({ resetToken }: { resetToken: number }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...DEFAULT_CAM.position);
    camera.lookAt(0, 0, 0);
  }, [resetToken, camera]);
  return null;
}

export function PotentialSurface({
  resetToken,
  onRange,
}: {
  resetToken: number;
  onRange: (min: number, max: number) => void;
}) {
  return (
    <div className="h-[420px] w-full rounded border border-border bg-[#050505]">
      <Canvas camera={{ position: DEFAULT_CAM.position, fov: DEFAULT_CAM.fov }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[2, 4, 3]} intensity={0.85} />
        <SurfaceMesh onRange={onRange} />
        <OrbitControls enableDamping dampingFactor={0.06} minDistance={1.5} maxDistance={8} />
        <CameraReset resetToken={resetToken} />
      </Canvas>
    </div>
  );
}
