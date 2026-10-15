# component-snapshots — React Component Gallery

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=20232A)](https://react.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)](https://playwright.dev/)
[![MIT License](https://img.shields.io/badge/License-MIT-2ea44f?style=flat)](LICENSE)

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
