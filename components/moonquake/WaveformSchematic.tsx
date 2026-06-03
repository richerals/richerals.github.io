import { CATEGORY_COLORS, type MoonquakeCategory } from "@/lib/moonquake/eventTypes";

const PATHS: Record<MoonquakeCategory, string> = {
  deep: "M0,52 Q8,48 14,50 T28,46 T42,44 T56,42 T70,40 T84,38 T98,36 T112,34 T126,32 T140,30 T154,28 T168,26 T182,24 T196,22 T210,20 T224,18 T238,16 T252,14 T266,12 T280,10",
  shallow:
    "M0,40 L6,38 L10,20 L14,42 L18,36 L24,34 L30,30 L36,28 L44,26 L52,24 L60,22 L72,20 L84,18 L96,16 L108,14 L120,12 L132,10 L144,8 L156,6 L168,4 L180,3 L192,2 L204,1 L216,0 L228,0 L240,0 L252,0 L264,0 L276,0 L280,0",
  meteoroid: "M0,50 L8,48 L12,8 L16,50 L20,46 L28,44 L40,42 L60,40 L90,38 L120,36 L150,34 L180,32 L210,30 L240,28 L280,26",
  thermal:
    "M0,48 L4,46 L6,44 L8,46 L10,44 L12,46 L14,44 L16,46 L18,44 L20,46 L22,44 L24,46 L26,44 L28,46 L30,44 L32,46 L34,44 L36,46 L38,44 L40,46 L42,44 L44,46 L46,44 L48,46 L50,44 L52,46 L54,44 L56,46 L58,44 L60,46 L62,44 L64,46 L66,44 L68,46 L70,44 L72,46 L74,44 L76,46 L78,44 L80,46 L82,44 L84,46 L86,44 L88,46 L90,44 L92,46 L94,44 L96,46 L98,44 L100,46 L102,44 L104,46 L106,44 L108,46 L110,44 L112,46 L114,44 L116,46 L118,44 L120,46 L122,44 L124,46 L126,44 L128,46 L130,44 L132,46 L134,44 L136,46 L138,44 L140,46 L142,44 L144,46 L146,44 L148,46 L150,44 L152,46 L154,44 L156,46 L158,44 L160,46 L162,44 L164,46 L166,44 L168,46 L170,44 L172,46 L174,44 L176,46 L178,44 L180,46 L182,44 L184,46 L186,44 L188,46 L190,44 L192,46 L194,44 L196,46 L198,44 L200,46 L202,44 L204,46 L206,44 L208,46 L210,44 L212,46 L214,44 L216,46 L218,44 L220,46 L222,44 L224,46 L226,44 L228,46 L230,44 L232,46 L234,44 L236,46 L238,44 L240,46 L242,44 L244,46 L246,44 L248,46 L250,44 L252,46 L254,44 L256,46 L258,44 L260,46 L262,44 L264,46 L266,44 L268,46 L270,44 L272,46 L274,44 L276,46 L278,44 L280,46",
  artificial:
    "M0,50 L8,48 L12,6 L16,50 L20,46 L28,44 L40,42 L60,40 L90,38 L120,36 L150,34 L180,32 L210,30 L240,28 L280,26",
};

export function WaveformSchematic({
  category,
  label,
  caption,
}: {
  category: MoonquakeCategory;
  label: string;
  caption: string;
}) {
  const color = CATEGORY_COLORS[category];

  return (
    <figure className="overflow-hidden rounded border border-border bg-bg/40">
      <div className="border-b border-border px-3 py-2">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-text">
          <span className="h-2 w-2 rounded-full" style={{ background: color }} />
          {label}
        </span>
      </div>
      <svg viewBox="0 0 280 56" className="h-16 w-full px-2 py-3" aria-hidden>
        <line x1="0" y1="28" x2="280" y2="28" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
        <path
          d={PATHS[category]}
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <figcaption className="border-t border-border px-3 py-2 text-xs leading-relaxed text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
