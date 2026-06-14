---
name: storybook-setup
description: Storybook configuration notes and known patterns for this project
metadata:
  type: project
---

Storybook v10.4.4 is installed with `@storybook/nextjs-vite` framework.

**usePathname null guard:** `usePathname()` returns `null` in the Storybook environment unless `nextjs.navigation.pathname` is set in story parameters. NavItem was patched to use `pathname?.startsWith(href) ?? false` instead of crashing. A global default `nextjs.navigation.pathname: '/dashboard'` is set in `.storybook/preview.tsx`. Per-story overrides work via `parameters.nextjs.navigation.pathname`.

**globals.css import:** `.storybook/preview.tsx` imports `../src/app/globals.css` so Tailwind utilities and CSS custom properties work in stories.

**pnpm build policy:** `pnpm-workspace.yaml` has `allowBuilds.esbuild: true` (was placeholder `set this to true or false` — had to activate it for Storybook's Vite dependency).

**Story conventions:**
- `layout: 'padded'` for NavItem (it's an inline element)
- `layout: 'fullscreen'` for TopBar and Sidebar (they're full-width)
- One `meta` export (default), named exports for each variant
- `satisfies Meta<typeof ComponentName>` pattern for type safety
