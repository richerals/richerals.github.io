export function MagnetLegend() {
  return (
    <p className="mt-2 text-center font-mono text-xs text-muted">
      <span className="text-accentRed">Red</span> = positive magnet ·{" "}
      <span className="text-accentBlue">Blue</span> = negative magnet · double-click a magnet to flip polarity
    </p>
  );
}
