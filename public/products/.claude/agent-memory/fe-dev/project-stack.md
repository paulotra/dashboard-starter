---
name: project-stack
description: Core stack and project layout for dashboard-starter
metadata:
  type: project
---

Next.js 16 (App Router), React 19, TypeScript strict, Tailwind v4, pnpm. `cn()` at `src/lib/utils.ts`. Path alias `@/*` → `src/*`. `lucide-react` for icons. `next/image` for images. No test runner configured yet.

**Why:** Confirmed from package.json.
**How to apply:** Always use `next/image`, never `<img>`. Always use lucide for icons. No arbitrary Tailwind values.
