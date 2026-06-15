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
- `--text-2xs: 0.625rem` — 10px font size; use `text-2xs`
- `--color-body-color: #f4f8fb` — page background; use `bg-body-color`
- `--color-border-color: #dae9f4` — table/card borders; use `border-border-color`
- Full primary/neutral/secondary/red/green/yellow scales already in globals.css

Components in src/components/:

ui/ primitives:
- `CardWrapper.tsx` — card chrome (`rounded-xl bg-white p-4`); spreads `ComponentPropsWithoutRef<'div'>`, merges className via cn. Default export + `CardWrapperProps`.
- `Avatar.tsx` — circular initials avatar; `size-10 rounded-full bg-primary-100 text-primary-500 text-xs font-medium`; props: `initials` (string), `className`, spreads div props; `aria-hidden="true"`. Default export + `AvatarProps`.
- `BadgeStatus.tsx` — status badge (Pending/Completed/Processing/Cancelled variants)
- `Button.tsx` — action button with variant prop
- `Logo.tsx`, `Switch.tsx`

Page-level feature tables are colocated under `_components/` in each route dir:
- `app/(dashboard)/orders/_components/OrdersTable.tsx` — full-featured orders table (search, status filter chips, sort, pagination)
- `app/(dashboard)/machines/_components/MachinesTable.tsx` — machines table (status filter, dynamic category chips derived from data, search, sort by name/category/lastMaintenance/dateAdded, per-row Switch toggle). No pagination. Image placeholder: `bg-primary-100 rounded-xl` + lucide `Coffee` icon.

dashboard/ components:
- `StatsCard.tsx` — KPI metric card; uses `<CardWrapper className="flex flex-col gap-2.5">`
- `RecentOrdersTable.tsx` — client component ('use client') with useState sort + useMemo; imports from lib/orders.ts + ui/SortIndicator; re-exports `Order` and `DEFAULT_ORDERS` for backward compat
- `OrdersTable.tsx` — full-featured client table with search, status filter chips, sort, pagination; props: orders, title, pageSize (default 15), className; uses SAMPLE_ORDERS (30 rows) from lib/orders
- `TopCustomers.tsx` — top customers list card; uses CardWrapper (p-0 override) + Avatar; props: `customers` (Customer[]), `title`, `onAllCustomersClick`, `allCustomersHref`, `className`; exports `Customer` interface and `DEFAULT_CUSTOMERS`; pluralizes machine/order counts

lib/ shared modules:
- `lib/dates.ts` — shared date parser: `MONTH_MAP` + `parseDate("DD Mon HH:mm")` → timestamp. Single source of truth for date parsing. Both `orders.ts` and `machines.ts` import from here.
- `lib/orders.ts` — source of truth for Order interface, SortKey/SortDirection types, parse helpers, STATUS_ORDER, compareOrders, DEFAULT_ORDERS (8 rows), SAMPLE_ORDERS (30 rows). Re-exports MONTH_MAP/parseDate from lib/dates.ts for backward compat.
- `lib/machines.ts` — Machine interface, MachineSortKey type, compareMachines helper, SAMPLE_MACHINES (5 rows). Imports parseDate from lib/dates.ts. Re-exports SortDirection from lib/orders.ts.

ui/ primitives:
- `ui/SortIndicator.tsx` — presentational sort icon (ChevronsUpDown/ChevronUp/ChevronDown); props: isActive, direction; imported from lib/orders types
- `ui/Pagination.tsx` — horizontal page nav; 32px square buttons, gap-1, rounded-lg; props: currentPage, totalPages, onPageChange, className; truncation with ellipsis (first, current±1, last pages shown); full a11y (aria-current, aria-label, disabled states)

layout/ components:
- `DashboardShell.tsx` — layout wrapper (client component with sidebar toggle); wraps content in `<PageActionsProvider>`
- `Sidebar.tsx`, `Navigation.tsx`, `Breadcrumb.tsx`
- `PageActionsContext.tsx` — page actions context slot system; exports `PageActionsProvider`, `NavActions`, `NavActionsSlot`, `useNavActions`, `usePageActions`

Page actions pattern:
- Pages use `<NavActions>{memoizedButtons}</NavActions>` (renders null, registers into context)
- `useNavActions(node, deps)` available for imperative/controlled registration
- `<NavActionsSlot/>` lives in Navigation's right side; clears automatically on page unmount
- Provider wraps both Navigation and page children inside DashboardShell

Icon pattern: use lucide-react directly (NOT a custom Icon abstraction). `src/components/icons/` directory was deleted — all icons now come from lucide-react. Icons used in RecentOrdersTable: `EllipsisVertical` (action menu), `ChevronsUpDown` (unsorted), `ChevronUp` (asc), `ChevronDown` (desc). Size via `size={14}` prop + `aria-hidden="true"`.

Static asset pattern: SVGs in `public/` are referenced as string paths `/filename.svg` in `next/image`. No module import for public-dir assets. The `next/image` component is used with `width`/`height` props for static SVGs from `public/`.
