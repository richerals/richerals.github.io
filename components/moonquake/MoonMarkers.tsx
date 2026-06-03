"use client";

import { useMemo } from "react";
import { MeshProps } from "@react-three/fiber";
import { latLonToCartesian } from "@/lib/moonquake/coordinates";
import { CATEGORY_COLORS, type MoonquakeEvent } from "@/lib/moonquake/eventTypes";
import { useMoonquake } from "@/context/MoonquakeContext";

const MARKER_RADIUS = 0.026;

export function MoonMarkers({ sphereRadius }: { sphereRadius: number }) {
  const { filteredEvents, selectedEvent, setSelectedEvent, setTooltip } = useMoonquake();

  const items = useMemo(
    () =>
      filteredEvents.map((event) => {
        const p = latLonToCartesian(event.lat, event.lon, sphereRadius + 0.035);
        return { event, position: [p.x, p.y, p.z] as [number, number, number] };
      }),
    [filteredEvents, sphereRadius]
  );

  return (
    <group>
      {items.map(({ event, position }) => {
        const selected = selectedEvent?.id === event.id;
        const color = CATEGORY_COLORS[event.category];
        return (
          <mesh
            key={event.id}
            position={position}
            scale={selected ? 1.75 : 1}
            onPointerOver={(e) => {
              e.stopPropagation();
              setTooltip({ event, x: e.clientX, y: e.clientY });
            }}
            onPointerMove={(e) => {
              e.stopPropagation();
              setTooltip({ event, x: e.clientX, y: e.clientY });
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setTooltip(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvent(event);
            }}
          >
            <sphereGeometry args={[MARKER_RADIUS, 16, 16]} />
            <meshBasicMaterial color={color} />
            {selected && (
              <mesh scale={1.9}>
                <sphereGeometry args={[MARKER_RADIUS, 16, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.28} />
              </mesh>
            )}
          </mesh>
        );
      })}
    </group>
  );
}

export function StationMarkers({
  sphereRadius,
  stations,
}: {
  sphereRadius: number;
  stations: { id: string; mission: string; lat: number; lon: number }[];
}) {
  return (
    <group>
      {stations.map((station) => {
        const p = latLonToCartesian(station.lat, station.lon, sphereRadius + 0.01);
        const props: MeshProps = { position: [p.x, p.y, p.z] };
        return (
          <mesh key={station.id} {...props}>
            <boxGeometry args={[0.03, 0.03, 0.03]} />
            <meshStandardMaterial color="#c7cbd1" />
          </mesh>
        );
      })}
    </group>
  );
}
