---
name: component-structure
description: Component directory layout — three subfolders under src/components/, naming conventions, import alias
metadata:
  type: project
---

Components live under src/components/ in three subfolders:

- src/components/ui/         — Primitive UI: BadgeStatus, Button, CardWrapper, Switch, Logo
- src/components/layout/     — Shell/chrome: DashboardShell, Sidebar, Navigation, Breadcrumb
- src/components/dashboard/  — Feature widgets: StatsCard, RecentOrdersTable

Each component's .stories.tsx lives alongside the component in the same subfolder.
No barrel index.ts files — all imports use direct paths.

Import alias: @/components/... (configured via tsconfig paths / Next.js default)

Inter-component import patterns:
- layout/ components that need ui/ primitives use the @/components/ui/ alias
  (e.g. Sidebar imports Logo via '../ui/Logo' relative, or @/components/ui/Logo)
- dashboard/ components use @/components/ui/CardWrapper etc.
- DashboardShell imports Sidebar and Navigation via relative './Sidebar' and './Navigation'
  (both in the same layout/ folder)
- Navigation imports Breadcrumb via relative './Breadcrumb' (same layout/ folder)

App-level imports (src/app/):
- (dashboard)/layout.tsx → @/components/layout/DashboardShell
- (dashboard)/dashboard/page.tsx → @/components/dashboard/StatsCard, @/components/dashboard/RecentOrdersTable

Storybook glob ../src/**/*.stories.@(js|jsx|mjs|ts|tsx) covers all subdirectories automatically.
