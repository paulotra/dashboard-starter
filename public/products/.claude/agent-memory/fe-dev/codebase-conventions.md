---
name: codebase-conventions
description: File layout, component conventions, and shared primitives for dashboard-starter
metadata:
  type: project
---

**Component locations:**
- UI primitives: `src/components/ui/` (CardWrapper, FilterChip, Switch, SortIndicator, Pagination, Button, Avatar, BadgeStatus)
- Form primitives: `src/components/form/` (TableSearch)
- Layout: `src/components/layout/` (PageActionsContext with NavActions, NavActionsSlot, useNavActions)
- Data libs: `src/lib/` (orders.ts, machines.ts, products.ts, dates.ts, numbers.ts, nav.ts, utils.ts)

**Page pattern:**
- `'use client'` at the top of every page that has interactions
- Memoize `actions` node passed to `<NavActions>` to prevent stale context updates
- Pages are named `[Feature]Page` (e.g. `ProductsPage`, `MachinesPage`, `OrdersPage`)
- Route-driven nav from `src/lib/nav.ts` — NAV_SECTIONS drives the sidebar; confirm entry before building

**Table pattern:**
- Feature table components live in `src/app/(dashboard)/[feature]/_components/[Feature]Table.tsx`
- Props: `items?`, `title?`, `pageSize?`, `className?`
- Reuse: CardWrapper, FilterChip with role="group" aria-labels, TableSearch, SortIndicator on <th> with aria-sort, Switch for toggles, Pagination + "Showing X–Y of Z" footer
- Local `activeStates` Record keyed by id mirrors machine/product toggle pattern
- Category filters derived from data with useMemo (no hardcoding)
- Reset `currentPage` to 1 on filter/search/sort changes

**Sort helpers:**
- `parseDate` in `src/lib/dates.ts` for "DD Mon HH:mm" date strings
- `parseAmount` in `src/lib/numbers.ts` for currency strings (strips non-numeric chars)
- `SortDirection` exported from `src/lib/orders.ts` (and re-exported from machines.ts, products.ts)

**Why:** Established across orders, machines, products tables.
**How to apply:** Always reuse these primitives. Never duplicate sort/filter/pagination logic.
