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
