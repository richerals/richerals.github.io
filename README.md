# Personal website (GitHub Pages)

Next.js static site: bio, projects, and an interactive **Nonlinear Systems** lab (RK4 magnetic pendulum, 3D potential, basins).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and [http://localhost:3000/projects/nonlinear-systems/](http://localhost:3000/projects/nonlinear-systems/).

Production build (static export to `out/`):

```bash
npm run build
```

Preview the export locally:

```bash
npx serve out
```

## Deploy on GitHub Pages

For **https://richerals.github.io** (user site, repo root):

1. Run `npm run build` — output is in `out/`.
2. Deploy the contents of `out/` to the `main` branch (either push `out/` as the site root, or use a GitHub Action that runs `npm ci && npm run build` and publishes `out/`).
3. **Settings → Pages** → deploy from the branch/folder that contains the built site.
4. `public/.nojekyll` is copied into `out/` so Jekyll does not strip `_next` assets.

## Project structure

```
app/                    # Routes (home, nonlinear-systems)
components/             # UI, simulation, potential (R3F), math, chaos
context/                # Shared simulation state
lib/                    # RK4, physics, potential, basins
assets/animations/      # Optional media for future projects
```

## Adding projects

Edit `lib/projects.ts` for cards on the homepage. Interactive pages live under `app/projects/`.

## License

Replace with your preferred license (e.g. MIT for code, CC BY for figures).
