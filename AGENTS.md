# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Single **Next.js 14** app (`personal-website`): static export for GitHub Pages, with an interactive **Nonlinear Systems** lab (RK4 magnetic pendulum, Three.js/R3F, basin visualization). All simulation runs in the browser; there is no backend, database, or Docker.

### Services

| Service | Required | Command |
|---------|----------|---------|
| Next.js dev server | Yes (dev / manual E2E) | `npm run dev` → http://localhost:3000 |
| Static preview | Optional | `npm run build` then `npx serve out` |

### Standard commands

See [README.md](README.md). Summary:

- **Install:** `npm install` (CI uses Node 20 + `npm ci`)
- **Dev:** `npm run dev`
- **Build:** `npm run build` (outputs static site to `out/`)
- **Lint:** `npm run lint` — see note below
- **Tests:** none defined (no test script or test runner in repo)

### Lint gotcha

`npm run lint` runs `next lint`. If the repo has **no** ESLint config (no `.eslintrc*` / `eslint.config.*`), the first run opens an **interactive** prompt to choose a preset. That blocks non-interactive shells. `npm run build` still type-checks and runs Next’s build-time checks without that prompt.

### Hello-world manual check

1. Open http://localhost:3000 (homepage + project cards).
2. Open http://localhost:3000/projects/nonlinear-systems/
3. Adjust sliders (e.g. damping, mass) and click the canvas to move the pendulum; initial conditions should update.

### Dev server in Cloud Agent VMs

Use **tmux** for long-running `npm run dev`, e.g. session name `next-dev-server`. The dev server does not hot-reload dependency installs reliably in all cases; after `npm install`, restart `npm run dev` if new packages were added.
