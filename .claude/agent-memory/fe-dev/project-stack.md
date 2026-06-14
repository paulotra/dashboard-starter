---
name: project-stack
description: Framework, tooling, and file layout for this dashboard-starter project
metadata:
  type: project
---

Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4, pnpm.

**Why:** This is a dashboard starter project — understanding the stack is foundational for every task.

**How to apply:** Always confirm before assuming React 18 patterns. React 19 has some API differences. Tailwind v4 uses `@theme inline {}` in CSS instead of `tailwind.config.js` for custom tokens — there is no `tailwind.config.js` in this project.

Key paths:
- Components: `src/components/` — EMPTY (wiped during reset; fresh start)
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge), keep always
- Design tokens + Tailwind wiring: `src/app/globals.css` — CSS custom properties + `@theme inline {}` block
- Path alias: `@/*` → `src/*`
- No tailwind.config.js — tokens live entirely in globals.css

Deleted during project reset (2026-06-14):
- `src/components/` (Sidebar, TopBar, NavItem + stories)
- `src/stories/` (Storybook example stories)
- `src/lib/nav.ts`
- `src/types/index.ts`

Scripts: `pnpm dev`, `pnpm build`, `pnpm typecheck` (tsc --noEmit), `pnpm lint` (eslint), `pnpm storybook` (port 6006), `pnpm build-storybook`

Storybook: v10.4.4, framework `@storybook/nextjs-vite` (Next.js + Vite, not Webpack). Stories at `src/**/*.stories.tsx`. Config in `.storybook/`.

Existing token additions beyond Tailwind defaults:
- `--color-brand-blue: #3564fc` — added for Logo component; use `bg-brand-blue`

Static asset pattern: SVGs in `public/` are referenced as string paths `/filename.svg` in `next/image`. No module import for public-dir assets. The `next/image` component is used with `width`/`height` props for static SVGs from `public/`.
