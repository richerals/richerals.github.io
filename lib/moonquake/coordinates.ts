export type Vec3 = { x: number; y: number; z: number };

const DEG2RAD = Math.PI / 180;

export function latLonToCartesian(lat: number, lon: number, radius: number): Vec3 {
  const phi = lat * DEG2RAD;
  const lambda = lon * DEG2RAD;
  const x = radius * Math.cos(phi) * Math.cos(lambda);
  const y = radius * Math.sin(phi);
  const z = radius * Math.cos(phi) * Math.sin(lambda);
  return { x, y, z };
}

export function cartesianToLatLon(x: number, y: number, z: number): { lat: number; lon: number } {
  const r = Math.sqrt(x * x + y * y + z * z) || 1;
  const lat = Math.asin(y / r) / DEG2RAD;
  const lon = Math.atan2(z, x) / DEG2RAD;
  return { lat, lon };
}

export function haversineDeg(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const phi1 = lat1 * DEG2RAD;
  const phi2 = lat2 * DEG2RAD;
  const dPhi = (lat2 - lat1) * DEG2RAD;
  const dLambda = (lon2 - lon1) * DEG2RAD;

  const a =
    Math.sin(dPhi / 2) * Math.sin(dPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) * Math.sin(dLambda / 2);
  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) / DEG2RAD;
}
