import { APOLLO_STATIONS, eventLabel, parseEventType, type MoonquakeEvent } from "./eventTypes";
import { haversineDeg } from "./coordinates";

type RawRow = {
  Type: string;
  Lat: string;
  Long: string;
  Depth: string;
  Date: string;
  YN_Lat: string;
  YN_Lon: string;
  YN_Depth: string;
  Phi: string;
  "Delta-a": string;
  "Delta-b": string;
  Depth_err: string;
};

export const MOONQUAKE_DATA_URL = "/data/gagnepian_2006_catalog.csv";

function parseNumber(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function parseCatalogDate(dateCode: string): Date {
  const yy = parseInt(dateCode.slice(0, 2), 10);
  const mm = parseInt(dateCode.slice(2, 4), 10) - 1;
  const dd = parseInt(dateCode.slice(4, 6), 10);
  const hh = parseInt(dateCode.slice(6, 8), 10);
  const min = parseInt(dateCode.slice(8, 10), 10);
  return new Date(Date.UTC(1900 + yy, mm, dd, hh, min));
}

function parseCSV(csvText: string): RawRow[] {
  const rows = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (rows.length < 2) return [];

  const headers = rows[0].split(",");
  return rows.slice(1).map((line) => {
    const cols = line.split(",");
    const row = {} as RawRow;
    headers.forEach((h, i) => {
      (row as Record<string, string>)[h] = cols[i] ?? "";
    });
    return row;
  });
}

function nearestStation(lat: number, lon: number): string {
  let best = APOLLO_STATIONS[0];
  let bestDist = Infinity;
  for (const s of APOLLO_STATIONS) {
    const d = haversineDeg(lat, lon, s.lat, s.lon);
    if (d < bestDist) {
      bestDist = d;
      best = s;
    }
  }
  return best.mission;
}

export function parseMoonquakeRows(rows: RawRow[]): MoonquakeEvent[] {
  return rows.map((raw, idx) => {
    const parsed = parseEventType(raw.Type);
    const lat = parseNumber(raw.Lat);
    const lon = parseNumber(raw.Long);
    const event: MoonquakeEvent = {
      id: `${raw.Type}-${raw.Date}-${idx}`,
      typeRaw: raw.Type,
      category: parsed.category,
      label: "",
      dateCode: raw.Date,
      originTime: parseCatalogDate(raw.Date),
      lat,
      lon,
      depthKm: parseNumber(raw.Depth),
      refinedLat: parseNumber(raw.YN_Lat),
      refinedLon: parseNumber(raw.YN_Lon),
      refinedDepthKm: parseNumber(raw.YN_Depth),
      phiDeg: parseNumber(raw.Phi),
      deltaA: parseNumber(raw["Delta-a"]),
      deltaB: parseNumber(raw["Delta-b"]),
      depthErrKm: parseNumber(raw.Depth_err),
      nearestStation: nearestStation(lat, lon),
      ...(parsed.category === "deep" ? { clusterId: parsed.clusterId } : {}),
      ...(parsed.category === "artificial"
        ? { mission: parsed.mission, vehicle: parsed.vehicle }
        : {}),
    };
    event.label = eventLabel(event);
    return event;
  });
}

export async function loadMoonquakeCatalog(url = MOONQUAKE_DATA_URL): Promise<MoonquakeEvent[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load moonquake data: ${res.status}`);
  const csv = await res.text();
  return parseMoonquakeRows(parseCSV(csv));
}
