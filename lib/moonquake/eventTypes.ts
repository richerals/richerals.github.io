export type MoonquakeCategory = "deep" | "shallow" | "meteoroid" | "thermal" | "artificial";

export type VehicleType = "LM" | "S-IVB";

export type ParsedEventType =
  | { category: "deep"; clusterId: string }
  | { category: "shallow" }
  | { category: "meteoroid" }
  | { category: "thermal" }
  | { category: "artificial"; mission: number; vehicle: VehicleType };

export type MoonquakeEvent = {
  id: string;
  typeRaw: string;
  category: MoonquakeCategory;
  label: string;
  dateCode: string;
  originTime: Date;
  lat: number;
  lon: number;
  depthKm: number;
  refinedLat: number;
  refinedLon: number;
  refinedDepthKm: number;
  phiDeg: number;
  deltaA: number;
  deltaB: number;
  depthErrKm: number;
  clusterId?: string;
  mission?: number;
  vehicle?: VehicleType;
  nearestStation?: string;
};

export type ApolloStation = {
  id: string;
  mission: string;
  lat: number;
  lon: number;
  description: string;
};

export const APOLLO_STATIONS: ApolloStation[] = [
  {
    id: "A11",
    mission: "Apollo 11",
    lat: 0.67408,
    lon: 23.47297,
    description: "Tranquility Base passive seismometer",
  },
  {
    id: "A12",
    mission: "Apollo 12",
    lat: -3.01084,
    lon: -23.42456,
    description: "Oceanus Procellarum station",
  },
  {
    id: "A14",
    mission: "Apollo 14",
    lat: -3.6453,
    lon: -17.47136,
    description: "Fra Mauro station",
  },
  {
    id: "A15",
    mission: "Apollo 15",
    lat: 26.13407,
    lon: 3.62981,
    description: "Hadley–Apennine station",
  },
  {
    id: "A16",
    mission: "Apollo 16",
    lat: -8.97577,
    lon: 15.49649,
    description: "Descartes Highlands station",
  },
];

export const CATEGORY_COLORS: Record<MoonquakeCategory, string> = {
  deep: "#3b82f6",
  shallow: "#ef4444",
  meteoroid: "#facc15",
  thermal: "#f5f5f5",
  artificial: "#facc15",
};

export const CATEGORY_LABELS: Record<MoonquakeCategory, string> = {
  deep: "Deep moonquake",
  shallow: "Shallow moonquake",
  meteoroid: "Meteoroid impact",
  thermal: "Thermal moonquake",
  artificial: "Artificial impact",
};

export function parseEventType(raw: string): ParsedEventType {
  const t = raw.trim().toUpperCase();
  if (t === "M") return { category: "meteoroid" };
  if (t === "SH") return { category: "shallow" };
  if (t === "TH") return { category: "thermal" };

  const deepMatch = /^A\d+$/.exec(t);
  if (deepMatch) return { category: "deep", clusterId: t };

  const artificialMatch = /^(\d+)\s+(LM|S-IVB)$/.exec(t);
  if (artificialMatch) {
    return {
      category: "artificial",
      mission: Number(artificialMatch[1]),
      vehicle: artificialMatch[2] as VehicleType,
    };
  }

  return { category: "meteoroid" };
}

export function eventLabel(event: MoonquakeEvent): string {
  if (event.category === "deep" && event.clusterId) {
    return `${CATEGORY_LABELS.deep} ${event.clusterId}`;
  }
  if (event.category === "artificial" && event.mission && event.vehicle) {
    return `Apollo ${event.mission} ${event.vehicle} impact`;
  }
  return CATEGORY_LABELS[event.category];
}
