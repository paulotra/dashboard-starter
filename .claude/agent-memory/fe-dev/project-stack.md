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
- `BadgeStatus.tsx` — refactored to generic `variant` ('success'|'danger'|'warning'|'info'|'neutral') + `children` string API. Legacy `status` prop (OrderStatus union) still works via internal map for backward compat. Exports `BadgeVariant` and `OrderStatus` types.
- `Button.tsx` — action button with variant prop (secondary, primary, primary-filled, danger, danger-filled)
- `Logo.tsx`, `Switch.tsx`
- `drawer/` — compound drawer: DrawerWrapper, DrawerHeader, DrawerBody, DrawerFooter. Barrel at `drawer/index.ts`. Full a11y: Esc, backdrop, focus trap, return focus, scroll-lock, role=dialog.

Page-level feature tables are colocated under `_components/` in each route dir:
- `app/(dashboard)/orders/_components/OrdersTable.tsx` — full-featured orders table (search, status filter chips, sort, pagination)
- `app/(dashboard)/machines/_components/MachinesTable.tsx` — machines table (status filter, dynamic category chips derived from data, search, sort by name/category/lastMaintenance/dateAdded, per-row Switch toggle). No pagination. Image placeholder: `bg-primary-100 rounded-xl` + lucide `Coffee` icon.
- `app/(dashboard)/customers/_components/CustomersTable.tsx` — customers table; props: customers?, title?, pageSize? (default 10), className?; columns: Customer (Avatar initials + name), Location, Status (BadgeStatus variant API), Orders (numeric right-aligned), Total Spent (medium right-aligned), action button. Filter chips derived from data. Search on name + location. Default sort: name asc.

dashboard/ components:
- `StatsCard.tsx` — KPI metric card; uses `<CardWrapper className="flex flex-col gap-2.5">`
- `RecentOrdersTable.tsx` — client component ('use client') with useState sort + useMemo; imports from lib/orders.ts + ui/SortIndicator; re-exports `Order` and `DEFAULT_ORDERS` for backward compat
- `OrdersTable.tsx` — full-featured client table with search, status filter chips, sort, pagination; props: orders, title, pageSize (default 15), className; uses SAMPLE_ORDERS (30 rows) from lib/orders
- `TopCustomers.tsx` — top customers list card; uses CardWrapper (p-0 override) + Avatar; props: `customers` (Customer[]), `title`, `onAllCustomersClick`, `allCustomersHref`, `className`; exports `Customer` interface and `DEFAULT_CUSTOMERS`; pluralizes machine/order counts

lib/ shared modules:
- `lib/dates.ts` — shared date parser: `MONTH_MAP` + `parseDate("DD Mon HH:mm")` → timestamp. Single source of truth for date parsing. Both `orders.ts` and `machines.ts` import from here.
- `lib/orders.ts` — source of truth for Order interface, SortKey/SortDirection types, parse helpers, STATUS_ORDER, compareOrders, DEFAULT_ORDERS (8 rows), SAMPLE_ORDERS (30 rows). Re-exports MONTH_MAP/parseDate from lib/dates.ts for backward compat.
- `lib/machines.ts` — Machine interface, MachineSortKey type, compareMachines helper, SAMPLE_MACHINES (5 rows). Imports parseDate from lib/dates.ts. Re-exports SortDirection from lib/orders.ts.
- `lib/customers.ts` — Customer interface, CustomerStatus union, CustomerSortKey, SortDirection, compareCustomers (status sorted by ordinal: Activated→Deactivated→Invite Sent→Expired), SAMPLE_CUSTOMERS (22 rows = ~3 pages). Uses parseAmount from lib/numbers.

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

form/ primitives:
- `form/TableSearch.tsx`
- `form/FormField.tsx` — labeled control wrapper; `label`, `required?`, `htmlFor?`, `helperText?`, `error?`.
- `form/Input.tsx` — `Omit<ComponentPropsWithoutRef<'input'>, 'prefix'>` + `prefix?: ReactNode`; h-11 rounded-lg. NOTE: must Omit native `prefix` (string) to redeclare as ReactNode.
- `form/Select.tsx` — native `<select>` styled; `options?: {label,value}[]`, `placeholder?`, ChevronDown icon.
- `form/ImageDropzone.tsx` — `<label>` wrapping sr-only file input; `onFileSelect?`, `label?`, `hint?`.

ESLint rule notes (next/core-web-vitals config is strict):
- `react-hooks/set-state-in-effect`: blocks any `setState` call inside `useEffect` body — use guarded render-phase setState (store prev identity in state, compare during render) instead.
- `react-hooks/refs`: blocks reading OR writing `ref.current` during render — refs are only for event handlers/effects. DOM refs (e.g. `fileInputRef`) are fine as long as `.current` is only touched in handlers.

Icon pattern: use lucide-react directly (NOT a custom Icon abstraction). `src/components/icons/` directory was deleted — all icons now come from lucide-react. Icons used in RecentOrdersTable: `EllipsisVertical` (action menu), `ChevronsUpDown` (unsorted), `ChevronUp` (asc), `ChevronDown` (desc). Size via `size={14}` prop + `aria-hidden="true"`.

Static asset pattern: SVGs in `public/` are referenced as string paths `/filename.svg` in `next/image`. No module import for public-dir assets. The `next/image` component is used with `width`/`height` props for static SVGs from `public/`.
