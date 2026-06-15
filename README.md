# alex-1883-test-44

Interactive decimal abacus built with Vite, React, and Tailwind CSS.

## Development

Install dependencies:

```bash
npm install
```

Run the local development server on `0.0.0.0:8080`:

```bash
npm run dev
```

## Validation

Run the unit tests, end-to-end test, linter, and production build:

```bash
npm run test
npm run test:e2e
npm run lint
npm run build
```

The end-to-end test uses Playwright and starts the Vite dev server
automatically.

## Production Build

Create the optimized static build:

```bash
npm run build
```

The production assets are written to `dist/`. This directory is ignored by git
because it is generated output.

Preview the built app locally on `0.0.0.0:8080`:

```bash
npm run preview
```

## Static Deploy

Deploy the contents of `dist/` to any static hosting service. Serve
`dist/index.html` as the entry point, and serve files under `dist/assets/` with
long-lived immutable cache headers because Vite fingerprints asset filenames.

If the static host supports fallback routing, route unknown paths to
`/index.html`. The current app renders at the root path and does not require a
backend, database, or server-side environment variables.
