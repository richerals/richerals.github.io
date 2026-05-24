# Personal website (GitHub Pages)

Static site for your bio, research, and animation gallery. No build step required.

## Quick start

1. Edit `index.html` — name, bio, links, research list.
2. Put animation files in `assets/animations/` (see formats below).
3. Register each animation in `js/animations.js`.
4. Push to GitHub and enable Pages (see below).

Local preview: open `index.html` in a browser, or run a simple server:

```bash
# Python
python -m http.server 8000

# Node (if you have npx)
npx serve .
```

Then visit `http://localhost:8000`.

## Animation formats (recommended)

| Format | Best for | Notes |
|--------|----------|--------|
| **MP4 (H.264)** | Most research loops | Smallest size at good quality; use `<video>`. |
| **WebM** | Web-only | Often smaller than MP4; add as second `<source>` if needed. |
| **GIF** | Legacy / simple exports | Large files; use only if you already have GIFs. |
| **Poster JPG** | Video thumbnails | Optional `poster` in `animations.js` for faster gallery load. |

**Tips**

- Keep gallery clips short (e.g. 5–30 s) and compress (HandBrake, ffmpeg, or export from your tool).
- Target width ~1280px for full-width lightbox; thumbnails can be smaller.
- GitHub repos have a soft limit (~100 MB per file); keep each video under ~25 MB when possible.

Example ffmpeg resize/compress:

```bash
ffmpeg -i input.mov -vf "scale=1280:-2" -c:v libx264 -crf 23 -an output.mp4
```

## Deploy on GitHub Pages

### Option A — User site (`username.github.io`)

1. Create a repo named **`richerals.github.io`**.
2. Copy this project into the repo root (not a subfolder).
3. Push to `main`.
4. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from branch → Branch: `main` / `/ (root)`**.
5. Site URL: **https://richerals.github.io**

### Option B — Project site (`username.github.io/repo-name`)

1. Create any repo (e.g. `personal-website`).
2. Push this project to that repo.
3. Enable Pages from `main` branch, root `/`.
4. Site URL: `https://richerals.github.io/personal-website/`

If you use Option B, you may need a `<base href="/personal-website/">` in `index.html` or host from a `docs/` folder — for a single-page site, **Option A is simpler**.

### Custom domain (optional)

Add a `CNAME` file with your domain, then configure DNS at your registrar (GitHub docs: [Custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).

## Adding an animation

1. Save file, e.g. `assets/animations/my-simulation.mp4`.
2. Add to `js/animations.js`:

```javascript
{
  type: "video",
  src: "assets/animations/my-simulation.mp4",
  poster: "assets/animations/my-simulation-poster.jpg", // optional
  title: "My simulation",
  description: "Caption and link to paper if you like.",
},
```

3. Commit and push; Pages updates in 1–2 minutes.

## File layout

```
personal_website/
├── index.html
├── css/style.css
├── js/
│   ├── animations.js   ← your animation list
│   └── main.js
├── assets/animations/  ← MP4, GIF, posters
└── README.md
```

## License

Replace this section with your preferred license (e.g. MIT for code, CC BY for figures).
