/**
 * Research themes + linked visualizations in one place.
 *
 * Each project can have zero or more media items (shown in the card).
 * Add MP4/GIF under assets/animations/ and list them in `media`.
 *
 * media item fields:
 *   type: "video" | "image"
 *   src, poster (optional), title, description
 */
const PROJECTS = [
  {
    id: "nonlinear-systems",
    title: "Nonlinear systems",
    summary:
      "Dynamics, stability, and emergent behavior in coupled physical systems.",
    tags: ["dynamics", "simulation"],
    link: null,
    media: [],
  },
  {
    id: "geophysics",
    title: "Geophysics",
    summary:
      "Earth and planetary processes; linking models to observable structure.",
    tags: ["geophysics", "planetary"],
    link: null,
    media: [],
  },
  {
    id: "scientific-visualization",
    title: "Scientific visualization",
    summary:
      "Turning simulation output into interpretable spatial and temporal views.",
    tags: ["visualization", "graphics"],
    link: null,
    media: [],
  },
  {
    id: "computational-modeling",
    title: "Computational modeling",
    summary:
      "Numerical experiments, parameter studies, and reproducible pipelines.",
    tags: ["HPC", "modeling"],
    link: null,
    media: [],
  },
];
