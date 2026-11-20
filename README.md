# Beehive

Static website built with React, Vite, TypeScript and the IBM Carbon Design System.

## Prerequisites

- Node.js 22.13 or later. The locked toolchain needs it: `vitest` requires `^22.12.0 || ^24.0.0 || >=26.0.0` and `eslint` requires `^20.19.0 || ^22.13.0 || >=24`.
- npm (bundled with Node.js).

## Getting started

```sh
npm ci
npm run dev
```

## Before you open a PR

Run `npm run lint`, `npm run format:check`, `npm test` and `npm run build`; all four must pass.

## Scripts

| Command                 | Description                             |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | Start the dev server                    |
| `npm run build`         | Type-check and build for prod           |
| `npm run preview`       | Preview the production build            |
| `npm run lint`          | Lint with ESLint                        |
| `npm run format`        | Format with Prettier                    |
| `npm run format:check`  | Check formatting                        |
| `npm test`              | Run unit tests (Vitest)                 |
| `npm run test:coverage` | Run tests with coverage (80% threshold) |

## Building and serving

`npm run build` writes the site to `dist/`, and `npm run preview` serves that folder locally.

Routing happens in the browser (`BrowserRouter`), so `/about` and `/contact` are not files in `dist/`. Whatever hosts the build must answer unknown paths with `index.html`; otherwise a refresh or direct link to those pages returns 404.

## Agentic Field Lab

The site has two independent experiences that share only the shell and visual design: **CUGA Page Studio** (`/cuga`) and **Hive Agent Fleet** (`/hive`). Neither sends data to the other.

### Guided preview (default)

`npm run dev` is enough. Without a backend both tabs run a guided preview, and every simulated result is labelled "guided demo" or "Sample data, not live".

### Live services

Credentials stay in a small Node server (`server/`), never in the React bundle. Copy the names from [`.env.example`](.env.example), export them, then run the server beside the dev server:

```sh
npm run server   # http://127.0.0.1:8787
npm run dev      # proxies /api to the server
```

| Service | Variables                               | What goes live                                                                                    |
| ------- | --------------------------------------- | ------------------------------------------------------------------------------------------------- |
| CUGA    | `CUGA_BASE_URL`                         | Chat answers about the demo page text, sent to CUGA's `POST /stream`. Needs CUGA's own model key. |
| Hive    | `HIVE_BASE_URL`, `HIVE_DASHBOARD_TOKEN` | A read-only list of runs from `GET /api/runs`.                                                    |

The server targets only the URLs in its environment, limits request size and rate (`RATE_LIMIT_PER_MINUTE`), and returns fixed error codes rather than upstream details. For a shared deployment set `BFF_ACCESS_TOKEN` and put an authenticating proxy in front; the server has no user login of its own.

### Known limitations

- CUGA page edits, highlights and screenshots from a real browser session are not live. CUGA's `web` and `hybrid` modes drive a browser through its Chrome extension, which this site does not embed. Live mode therefore answers questions about the page text only; edits stay in the guided demo and change the preview in your browser session, never the repository.
- The CUGA `/stream` call is made without a user session. If the CUGA server has authentication enabled, live mode will report an error.
- The Hive tab lists runs only. Task cards, agent lanes and the stage walkthrough are sample data. Stage names and ACMM levels come from the Hive documentation (hivecommons/hive).
- `thinkscientist/beehive` is this repository, a Hive-managed sample project. The Hive page treats Hive Commons (`hivecommons/hive`) as the source of truth.
- Live paths are covered by unit tests with mocked services. They have not been exercised against running CUGA or Hive servers.
