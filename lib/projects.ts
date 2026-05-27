export type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  href: string | null;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "nonlinear-systems",
    title: "Nonlinear systems",
    summary:
      "Chaotic magnetic pendulum — RK4 integration on a signed multi-magnet potential with compare mode and basins of attraction.",
    tags: ["dynamics", "chaos", "RK4"],
    href: "/projects/nonlinear-systems/",
    featured: true,
  },
  {
    id: "geophysics",
    title: "Geophysics",
    summary: "Earth and planetary processes; linking models to observable structure.",
    tags: ["geophysics", "planetary"],
    href: null,
  },
  {
    id: "scientific-visualization",
    title: "Scientific visualization",
    summary: "Turning simulation output into interpretable spatial and temporal views.",
    tags: ["visualization", "graphics"],
    href: null,
  },
  {
    id: "computational-modeling",
    title: "Computational modeling",
    summary: "Numerical experiments, parameter studies, and reproducible pipelines.",
    tags: ["HPC", "modeling"],
    href: null,
  },
];

export const NONLINEAR_BLURB =
  "The project explores nonlinear dynamical systems and chaotic behavior through magnetic potential landscapes, where small differences in initial conditions produce drastically different trajectories.";
