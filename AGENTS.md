# AGENTS.md

## Purpose

- This file is the repo-specific operating guide for coding agents working in `secondbrain`.
- Follow existing patterns before introducing new ones.
- Keep changes small, typed, and compatible with a static-exported Next.js app.

## Repository Overview

- App type: Next.js 15 application using the App Router.
- App directory: root-level `app/`, not `src/app/`.
- Language: TypeScript with `strict: true`.
- Styling: Tailwind CSS with a dark theme and custom tokens for `surface`, `border`, `text`, and `accent`.
- Fonts: Inter and JetBrains Mono.
- Export model: `next.config.js` uses `output: 'export'` and `images.unoptimized = true`.
- Layout baseline: `app/layout.tsx` renders `<html className="dark">`, a `Sidebar`, and a scrollable main content panel.

## Commands

- Install deps: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Production start: `npm run start`
- Lint: `npm run lint`

## Validation Notes

- There is no test script in `package.json`.
- Do not invent Jest, Vitest, Playwright, or `npm test` workflows unless the repo is explicitly updated.
- Validate non-trivial changes with:
  - `npm run build`
  - `npm run lint`
- Keep TypeScript strict-mode clean; use `npx tsc --noEmit` only when a manual type check is needed.

## Repository Architecture

- `app/` contains App Router pages, route segments, shared layout, and route-specific UI composition.
- `components/` contains reusable UI such as navigation, cards, and content presentation components.
- `lib/` contains document-loading and content utilities.
- `documents/` contains the markdown knowledge base that powers the site.
- `documents/` subfolders are part of the app contract:
  - `documents/concepts/`
  - `documents/daily/`
  - `documents/projects/`
  - `documents/insights/`

## Content/Data Model

- Markdown content in `documents/` is the primary data source.
- `lib/documents.ts` uses Node `fs`, `path`, and `gray-matter` to read markdown files from disk.
- Shared document interfaces currently live in `lib/documents.ts`:
  - `DocumentMeta`
  - `Document`
- Supported document types are:
  - `'concept' | 'daily' | 'project' | 'insight'`
- Treat the `documents/` folder structure and frontmatter parsing behavior as part of the app's public contract.
- When extending the content model, update the shared interfaces and document-loading logic together.

## Code Style

- Keep TypeScript strict-safe and avoid `any` unless narrowing truly dynamic input.
- Match Next.js 15 App Router conventions for route files, layouts, and dynamic segments.
- Prefer functional React components.
- Keep changes compatible with static export constraints; introduce server-only assumptions, runtime-only features, or request-time dependencies carefully.
- Avoid unnecessary abstraction when an existing local pattern already fits.

## Naming Conventions

- Component files use PascalCase, e.g. `Sidebar.tsx`, `DocumentCard.tsx`.
- Route files remain framework-standard lowercase names such as `page.tsx`, `layout.tsx`, and dynamic folders like `[tag]`.
- Props use typed interfaces named for the component, e.g. `DocumentCardProps`.
- Shared types and interfaces use PascalCase.
- Local helpers use descriptive camelCase.

## Imports and Exports

- Use the `@/*` alias for cross-repo imports; it maps to the repository root.
- Avoid deep relative import chains when `@/` is clearer.
- Components currently use named exports; preserve that pattern unless a file already differs.
- Keep import style consistent within the file you touch.

## UI and Tailwind Conventions

- Preserve the established dark theme.
- Reuse the existing Tailwind token vocabulary for `surface`, `border`, `text`, and `accent` instead of introducing ad hoc colors.
- Tailwind content scanning covers `app/**/*`, `components/**/*`, and `lib/**/*`; keep UI code within those scanned areas.
- Maintain the current shell pattern: sidebar navigation with a scrollable main panel.
- Favor inline Tailwind utilities unless a repeated pattern clearly justifies extraction.
- Respect the existing typography choices built around Inter and JetBrains Mono.

## Error Handling / Content Handling Expectations

- Missing markdown content should degrade gracefully rather than crash pages or builds.
- Treat absent files, empty folders, invalid frontmatter, or malformed markdown as expected content-state problems.
- Prefer fallback arrays, empty states, or filtered results over hard failures where possible.
- Be careful with filesystem usage because the app is statically exported; build-time content access is expected, but runtime-only filesystem assumptions should not leak into client code.
- Keep content parsing tolerant and predictable.

## Route Guidance

- Main routes include `/`, `/daily`, `/concepts`, `/projects`, `/insights`, `/tags`, `/tags/[tag]`, `/search`, and `/[folder]/[slug]`.
- Preserve route semantics when changing document loading or URL generation.
- Dynamic routes should stay aligned with the supported document folders and slugs produced from `documents/` content.
- For search, tags, and listing pages, prefer deterministic derived data from the markdown source rather than introducing external services.

## Practical Agent Rules

- Read the touched file and nearby files before editing.
- Keep edits aligned with current architecture and export constraints.
- Do not add unsupported runtime features that conflict with static export behavior.
- Do not treat `documents/` as incidental content; its structure is part of the application contract.
- Do not let missing markdown data break navigation, listings, or page rendering.
- Validate meaningful changes with `npm run build` and `npm run lint`.
