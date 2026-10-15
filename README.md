# component-snapshots

A small React gallery for previewing components and their states. A Playwright script captures the gallery cards at three viewport widths.

## Run locally

Requires Node.js 20.19 or later.

```sh
npm install
npm run dev
```

To capture screenshots, install Chromium once and run the capture script:

```sh
npx playwright install chromium
npm run screenshots
```

PNG files are saved in `screenshots/`, which is ignored by Git. Run `npm test` for the catalog and filter tests, or `npm run build` to create the static app in `dist/`.
