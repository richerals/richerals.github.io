# Personal website (GitHub Pages)

Next.js static site: bio, projects, and an interactive **Nonlinear Systems** lab (RK4 magnetic pendulum, 3D potential, basins).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and [http://localhost:3000/projects/nonlinear-systems/](http://localhost:3000/projects/nonlinear-systems/).

Optional — preview the production build locally (not required for daily work):

```bash
npm run build
npx serve out
```

## Deploy on GitHub Pages

Pushing to `main` runs [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml): `npm ci` → `npm run build` → publish `out/` to Pages.

**One-time setup** in the repo on GitHub:

1. **Settings → Pages → Build and deployment**
2. **Source:** GitHub Actions (not “Deploy from branch”)

Site URL: **https://richerals.github.io**

`public/.nojekyll` is copied into `out/` so Jekyll does not strip `_next` assets.

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
