# Agent Guidelines

## Site structure

- This is James Angus's personal Hugo site at `ejangi.com`.
- `themes/ejangi/` is the owner's custom theme. Edit its layouts, partials, SCSS (`assets/scss/`), and static assets directly when changing the design.
- `config.toml` holds site settings and profile information; `content/about.md` supplies the homepage About section.
- Keep changes focused and consistent with the existing design and Australian English copy.

## Content

- `content/projects/<slug>/index.md`: portfolio items, with supporting images in the bundle's `images/` directory. Project front matter includes `problem`, `key` (Markdown contributions), and `breakdown`, in addition to the shared title, description, date, keywords, icon, and draft fields.
- `content/gold/<slug>/index.md`: apps, books, and other things the owner currently enjoys. These appear as compact links in a small homepage section; include an external `link`, a short description, and an icon.
- Use the theme's archetypes to create bundles:
  - `docker compose run --rm app hugo new projects/<slug>/index.md`
  - `docker compose run --rm app hugo new gold/<slug>/index.md`
- Follow nearby entries for front matter and relative image paths. New entries default to `draft: true`; set `draft: false` when ready to publish. Dates control the homepage's newest-first selections.
- Homepage project cards use a bundle image with an icon badge, falling back to the icon alone. Set optional `cardImage: "images/example.png"` to choose the card's artwork.

## Development and validation

Use Docker Compose for all development commands, builds, checks, and tests. Do not use host-installed Hugo or other development tooling; the container defines supported versions and dependencies.

- Start the development server: `docker compose up --build` (http://localhost:1313).
- Run one-off commands: `docker compose run --rm app <command>`.
- Validate site changes: `docker compose run --rm app hugo --minify`.
- Visual checks: `docker compose --profile visual run --build --rm playwright` (starts the app and writes mobile/desktop screenshots to ignored `test-results/`). The Playwright service is development-only.
- After changing dependencies or the Docker image, run `docker compose build` before validating.

The repository is mounted at `/src` in the `app` service. Hugo Extended compiles the theme's SCSS. Edit source files rather than generated `public/` or `resources/` output, and do not commit generated build artifacts.

## Deployment

GitHub changes deploy automatically to Cloudflare Pages. Preserve that workflow; the older Cloud Build configuration and historical README commands are not the current deployment instructions. Production Hugo output is `public/`.
