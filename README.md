# Smart Document Workspace

Document management SPA: list, upload, detail view, and analytics. Built with React 18+, Vite, and TypeScript.

## Requirements

- Node.js 18+ (20+ recommended for Vite 7)
- npm

## Setup

```bash
npm install
```

If you see peer dependency conflicts, use:

```bash
npm install --legacy-peer-deps
```

For E2E tests, install the Cypress binary once:

```bash
npx cypress install
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` / `npm start` | Start dev server (default: http://localhost:5173) |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Serve production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest unit tests |
| `npm run test:watch` | Jest in watch mode |
| `npm run e2e` | Run Cypress E2E tests (headless) |
| `npm run e2e:open` | Open Cypress Test Runner (interactive) |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting (CI) |
| `npm run storybook` | Start Storybook (port 6006) |
| `npm run build-storybook` | Build Storybook for deploy |

## E2E tests (Cypress)

1. Start the app: `npm run dev`
2. In another terminal: `npm run e2e` or `npm run e2e:open`

Specs: navigation, document list, document detail, upload flow, analytics (`cypress/e2e/*.cy.ts`).

## Features

- **Documents list** — table/grid, search, sort, pagination, row selection (bulk bar)
- **Document upload** — multi-step flow: file → metadata → review; validation; mock upload
- **Document detail** — metadata, preview placeholder, version history, activity log, comments (threaded), sharing (add by email, view/edit/admin)
- **Analytics** — storage by type, upload activity, documents by status; date range filter
- **i18n** — English and Ukrainian (i18next)

Data is mocked (RTK Query + in-memory mock). No backend required.

## Project structure

```
src/
  api/           # RTK Query API, mock data
  appRoutes.config.tsx
  App.tsx
  helpers/       # formatBytes, formatDate, remUtils (+ unit tests)
  i18n/          # en, uk locales
  modules/
    documents/
      documentListPage/
      documentDetailPage/
      uploadPage/
      analyticsPage/
  shared/        # types, uiKit (Button, Input, Badge, Card, Modal, Tooltip)
  store/         # Redux store
```

## Tech stack

- **React 18**, **Vite 7**, **TypeScript** (strict)
- **State:** Redux (RTK Query for API), Zustand (document list + upload flows)
- **UI:** SCSS modules, path aliases (`@modules`, `@shared`, `@api`, `@helpers`, `@i18n`, etc.)
- **Testing:** Jest + ts-jest (unit), Cypress (E2E)
- **Code quality:** ESLint, Prettier
- **Other:** React Router 7, Formik + Yup, Recharts, react-dropzone, notistack, Storybook
