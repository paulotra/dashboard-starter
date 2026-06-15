---
name: project-stack
description: Core tech stack for dashboard-starter — framework, styling, tooling, scripts
metadata:
  type: project
---

Framework: React 19 with Next.js 16 (App Router, Turbopack)
Language: TypeScript strict mode
Styling: Tailwind CSS v4 (@tailwindcss/vite, @tailwindcss/postcss)
Package manager: pnpm
Build tool: Next.js (next build / next dev)
State: local useState/useReducer only — no global store library
Testing: Vitest + @storybook/addon-vitest + Playwright
Storybook: v10, @storybook/nextjs-vite adapter, stories globbed at src/**/*.stories.@(js|jsx|mjs|ts|tsx)

Scripts:
- pnpm dev — dev server
- pnpm build — production build
- pnpm typecheck — tsc --noEmit
- pnpm lint — eslint
- pnpm format — prettier --write .
- pnpm storybook — storybook dev -p 6006
