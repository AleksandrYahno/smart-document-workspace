# Smart Document Workspace

Document management workspace — React 18+ with Vite and TypeScript.

## Setup

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` / `npm run start` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run preview` — preview production build
- `npm test` — run Jest unit tests
- `npm run test:watch` — Jest in watch mode
- `npm run e2e` — run Cypress E2E tests (headless)
- `npm run e2e:open` — open Cypress Test Runner (interactive)

## E2E tests (Cypress)

1. Start the app: `npm run dev`
2. In another terminal: `npm run e2e` (headless) or `npm run e2e:open` (interactive)

Tests live in `cypress/e2e/`: navigation, document list, document detail, upload flow, analytics.

## Tech stack

- React 18+, Vite, TypeScript (strict)
- Path aliases: `@components`, `@shared`, `@modules`, `@api`, `@store`, `@helpers`, `@i18n`, `@providers`, `@configs`, `@assets`, `@hooks`, `@typesFolder`
- Unit tests: Jest + ts-jest. E2E: Cypress.
