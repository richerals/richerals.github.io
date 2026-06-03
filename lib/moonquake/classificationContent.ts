import type { MoonquakeCategory } from "./eventTypes";

export const CLASSIFICATION_ORDER: MoonquakeCategory[] = ["deep", "shallow", "meteoroid", "thermal"];

export const CLASSIFICATION_MATRIX_ORDER: MoonquakeCategory[] = [
  "deep",
  "shallow",
  "meteoroid",
  "thermal",
  "artificial",
];

export const CLASSIFICATION_DESC: Record<MoonquakeCategory, string> = {
  deep: "Tidal-stress-driven events in deep lunar interior clusters.",
  shallow: "Rare higher-energy quakes associated with near-surface faulting.",
  meteoroid: "Impacts from meteoroids or known artificial impactors.",
  thermal: "Temperature-driven cracking events near sunrise/sunset boundaries.",
  artificial: "Human-made impacts from Apollo hardware.",
};

export type ClassificationDetail = {
  definition: string;
  basis: string;
  signal: string;
  waveformMorphology: string;
  waveformFeatures: string;
  diagnosticFeatures: string[];
  classificationReason: string;
  limitations: string;
  typicalDuration: string;
};

export const CLASSIFICATION_DETAILS: Record<MoonquakeCategory, ClassificationDetail> = {
  deep: {
    definition:
      "Events sourced hundreds of kilometers below the lunar surface, often grouped into recurring clusters labeled A1–M7 in the Apollo catalog.",
    basis:
      "Classified mainly by depth, repeatability, and correlation with tidal stressing of the lunar interior.",
    signal: "Expected to show repeating waveform families rather than single impulsive arrivals.",
    waveformMorphology:
      "Emergent onset with no sharp P-wave arrival; energy builds gradually and the coda can persist for tens of minutes to hours because of intense scattering in the dry lunar crust.",
    waveformFeatures:
      "Look for repeatable waveform families rather than one isolated spike. The trace rises gradually, rings for a long time, and tends to recur from the same cluster when lunar tides reload the source region.",
    diagnosticFeatures: [
      "Waveform similarity within a fixed cluster (same source region reactivated)",
      "Recurrence on fortnightly and monthly tidal cycles",
      "Relatively low amplitude compared with shallow events at similar distance",
      "Inferred focal depths typically around 700–1200 km",
    ],
    classificationReason:
      "Analysts grouped events with nearly identical seismograms into source clusters, then linked recurrence timing to tidal modulation of deep shear failure. Depth was inferred from travel-time curves and network geometry rather than a clear first arrival.",
    limitations:
      "The onset can be weak and scattered, so depth and cluster assignment depend on network geometry, stacking, and catalog cross-correlation rather than a single clean arrival.",
    typicalDuration: "10 min – several hours (long, ringing coda)",
  },
  shallow: {
    definition:
      "Near-surface or crustal events that can release relatively high seismic energy—only a few dozen were identified in the Apollo record.",
    basis: "Classified by shallower inferred source depth and stronger crustal-mechanics relevance.",
    signal: "Can produce clearer high-amplitude arrivals and are important for future surface infrastructure risk.",
    waveformMorphology:
      "More impulsive than deep events, with higher peak amplitudes and somewhat shorter codas, but still elongated relative to terrestrial earthquakes because of lunar scattering.",
    waveformFeatures:
      "The trace usually has a stronger amplitude envelope than deep moonquakes, with a clearer onset and substantial high-frequency energy. It does not repeat as a stable tidal cluster.",
    diagnosticFeatures: [
      "Higher signal-to-noise ratio at multiple stations",
      "Shallower inferred depth (crustal focus)",
      "No repeating cluster ID; spatially isolated sources",
      "Occasionally the largest-amplitude natural moonquakes in the catalog",
    ],
    classificationReason:
      "Shallow events were separated when amplitude, spectral content, and location solutions indicated a crustal focus rather than a deep tidal cluster. Their rarity and energy make them the primary natural hazard class for future habitats.",
    limitations:
      "Only a small number of shallow events were cataloged, so classification is more sensitive to uncertain locations, station coverage, and amplitude scaling than the common deep-event families.",
    typicalDuration: "~1–10 min (shorter coda than deep events)",
  },
  meteoroid: {
    definition:
      "Impulsive surface sources produced by meteoroid strikes on the lunar regolith.",
    basis: "Classified from impact timing, surface location, and near-zero source depth.",
    signal: "Useful as calibration impulses because source timing and approximate position can be constrained.",
    waveformMorphology:
      "Short, impulsive first motion followed by a rapid decay; resembles a hammer blow on the surface. Onset is much sharper than deep moonquakes and lacks extended tidal-style codas.",
    waveformFeatures:
      "Impact traces start abruptly and decay from a surface impulse. The key clue is the combination of sharp onset, shallow source, lack of recurrence, and network timing consistent with a surface strike.",
    diagnosticFeatures: [
      "Sudden, high-frequency onset across the network",
      "Surface focus (depth ≈ 0 km) from location algorithms",
      "No tidal periodicity or cluster recurrence",
      "Travel-time triangulation from multiple Apollo stations",
    ],
    classificationReason:
      "Impacts were distinguished from moonquakes by impulsive waveform shape, short duration, and surface focal depth. When timing and location could not be tied to a known mission event, the event was labeled meteoroid (M).",
    limitations:
      "Natural meteoroid impacts can resemble artificial impacts in waveform shape, so the distinction relies on whether mission timing and impact coordinates are known.",
    typicalDuration: "Seconds to ~1 min",
  },
  thermal: {
    definition:
      "Small near-surface events driven by thermal expansion and contraction as the lunar surface heats and cools.",
    basis: "Classified by shallow source process and temperature-cycle association.",
    signal: "Usually small, local, and repetitive around strong thermal transitions.",
    waveformMorphology:
      "Very small amplitude, short bursts often visible only on the nearest station; can appear as rapid, high-frequency crackling rather than a single long-period pulse.",
    waveformFeatures:
      "Thermal signals are local micro-events: tiny amplitude, short duration, and strong association with sunrise or sunset thermal stress rather than a global network arrival.",
    diagnosticFeatures: [
      "Correlation with sunrise/sunset terminator crossing station longitude",
      "High local frequency content, low amplitude",
      "Detected mainly at one or two nearby stations",
      "High event rate but low individual energy",
    ],
    classificationReason:
      "Thermal events were identified when signals clustered at dawn/dusk local times and lacked the amplitude or network-wide coherence of impacts or shallow quakes. They reflect regolith cracking, not deep interior failure.",
    limitations:
      "Thermal moonquakes are not represented in the Nunn et al. Figure 3 comparison panel, so their classification is explained from timing, locality, and Apollo 17 thermal-catalog work.",
    typicalDuration: "Sub-second to a few seconds",
  },
  artificial: {
    definition: "Known Apollo LM ascent stages and S-IVB upper stages deliberately impacted on the Moon.",
    basis: "Classified by mission operations, known impact timing, and surface impact geometry.",
    signal: "Impulse-like waveforms that help calibrate propagation through lunar crustal structure.",
    waveformMorphology:
      "Very impulsive, similar to meteoroid impacts, but tied to exact mission timestamps. Used as controlled sources to estimate crustal velocity and attenuation.",
    waveformFeatures:
      "The waveform behaves like an impact impulse, but the class is anchored by mission operations: known impact time, known source type, and predicted surface coordinates.",
    diagnosticFeatures: [
      "Impact time and coordinates known from mission logs",
      "Strong impulsive onset at all operating stations",
      "Fixed surface source used for velocity model calibration",
      "Labeled by mission number and vehicle (LM or S-IVB)",
    ],
    classificationReason:
      "These are not inferred classes: impact times and locations were known a priori. They anchor the catalog by providing ground-truth impulses for comparing natural event waveforms and refining lunar velocity structure.",
    limitations:
      "The waveform is not enough by itself to distinguish artificial from meteoroid impact; the decisive evidence is external mission metadata.",
    typicalDuration: "Seconds (sharp impulse)",
  },
};

export const CLASSIFICATION_METHODOLOGY = {
  title: "From seismogram to source class",
  intro:
    "Apollo Passive Seismic Experiment analysts did not have sharp P- and S-wave picks like terrestrial networks. Classification combined waveform shape, event duration, recurrence, source depth from location inversions, and—in some cases—known impact metadata.",
  steps: [
    {
      label: "Waveform morphology",
      text: "Compare onset sharpness, coda length, and frequency content. Impacts are impulsive; deep moonquakes are emergent and long; thermal events are tiny and local.",
    },
    {
      label: "Recurrence & similarity",
      text: "Stack and correlate seismograms. Deep events repeat with similar waveforms from the same cluster; impacts and shallow events do not form long-term families.",
    },
    {
      label: "Tidal & diurnal timing",
      text: "Deep clusters modulate with fortnightly tides; thermal bursts track sunrise/sunset at each station; impacts lack periodic tidal phasing.",
    },
    {
      label: "Location & depth",
      text: "Multi-station arrival times constrain epicenter and focal depth. Surface foci suggest impacts; deep foci indicate interior moonquakes.",
    },
  ],
  lunarNote:
    "Lunar seismograms differ from terrestrial ones: scattering in the dry, fractured crust spreads energy over long codas, so duration and waveform similarity often matter more than a single first-arrival pick.",
};

export const WAVEFORM_COMPARISON = [
  {
    category: "deep" as const,
    label: "Deep moonquake",
    caption: "Emergent onset, long ringing coda, repeating cluster waveforms.",
  },
  {
    category: "shallow" as const,
    label: "Shallow moonquake",
    caption: "Stronger amplitude, somewhat sharper onset, isolated sources.",
  },
  {
    category: "meteoroid" as const,
    label: "Impact",
    caption: "Impulsive hammer-like onset, short duration, surface focus.",
  },
  {
    category: "thermal" as const,
    label: "Thermal",
    caption: "Micro-bursts near terminator, visible mainly on nearest station.",
  },
];

export const APOLLO_WAVEFORM_FIGURE = {
  src: "/moonquake/apollo-waveform-types.jpg",
  alt: "Apollo S12 waveform examples for a deep moonquake, meteoroid impact, shallow moonquake, and artificial impact",
  source:
    "Nunn et al. (2022), A New Archive of Apollo's Lunar Seismic Data, Figure 3",
  href: "https://iopscience.iop.org/article/10.3847/PSJ/ac87af",
  caption:
    "Real Apollo S12 vertical-component waveform examples: deep moonquake, meteoroid impact, shallow moonquake, and artificial impact. Time is plotted in minutes after arrival; each panel uses a different amplitude scale.",
};

export const TRACE_READING_GUIDE = [
  {
    label: "Onset",
    text: "Impacts begin abruptly; deep moonquakes rise more gradually because the first arrivals are scattered and weak.",
  },
  {
    label: "Coda",
    text: "Long ringing codas are common on the Moon because dry fractured crust scatters energy and attenuates it slowly.",
  },
  {
    label: "Frequency",
    text: "Thermal and impact events tend to emphasize shorter, higher-frequency bursts; deep events are often recognized by family similarity.",
  },
  {
    label: "Context",
    text: "Waveform shape is combined with depth, recurrence, station coverage, and known mission impact metadata.",
  },
];

export const CATALOG_READING_NOTES = {
  title: "Reading the catalog rows",
  paragraphs: [
    "Each marker starts as a catalog row: a source label, origin time, latitude, longitude, depth, and uncertainty fields. The interface keeps those fields attached to the selected marker instead of treating the globe as a decorative layer.",
    "Color filters correspond to parsed source classes, while depth and uncertainty fields are interpreted results from Apollo seismic analysis. The points are useful spatial estimates, not exact ground truth.",
    "When reading a selected event, compare its class, depth, nearest station, and uncertainty together. A high-quality visual interpretation depends on the catalog metadata and the station geometry behind it.",
  ],
};

export const CLASSIFICATION_REFERENCES = [
  {
    label: "NASA Moonquakes overview",
    href: "https://science.nasa.gov/moon/moonquakes?utm_source=chatgpt.com",
  },
  {
    label: "NASA Apollo moonquake research",
    href: "https://science.nasa.gov/solar-system/moon/nasas-apollo-samples-lro-help-scientists-predict-moonquakes/?utm_source=chatgpt.com",
  },
  {
    label: "Apollo 17 moonquake catalog technical report (Gagnepain-Bénevie et al.)",
    href: "https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20170002695.pdf?utm_source=chatgpt.com",
  },
  {
    label: "Nunn et al. 2022 — Figure 3 Apollo waveform examples",
    href: "https://iopscience.iop.org/article/10.3847/PSJ/ac87af",
  },
  {
    label: "Nakamura et al. — Apollo lunar seismic profiling (classic waveform taxonomy)",
    href: "https://ntrs.nasa.gov/citations/19740040727",
  },
];

export function categoryEventCount(
  events: { category: MoonquakeCategory }[],
  cat: MoonquakeCategory
): number {
  return events.filter(
    (e) => e.category === cat || (cat === "meteoroid" && e.category === "artificial")
  ).length;
}
