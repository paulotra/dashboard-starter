---
name: drawer-form-primitives
description: Drawer compound component and form field primitives added 2026-06-15; API, conventions, and decisions
metadata:
  type: project
---

## Drawer primitive (`src/components/ui/drawer/`)

Files: `DrawerContext.tsx`, `DrawerWrapper.tsx`, `DrawerHeader.tsx`, `DrawerBody.tsx`, `DrawerFooter.tsx`, `index.ts`, `Drawer.stories.tsx`.

Import via barrel: `import { DrawerWrapper, DrawerHeader, DrawerBody, DrawerFooter } from '@/components/ui/drawer'`

**DrawerWrapper props:** `open`, `onClose`, `children`, `side?` ('right' default), `widthClassName?` (default `'w-full sm:max-w-lg'`), `aria-label?`.

Width decision: used `w-full sm:max-w-lg` (512px on sm+) — no arbitrary values. [[tailwind-conventions]]

**Behaviors implemented:** Esc closes, backdrop click closes, focus trap (Tab/Shift+Tab wraps), return focus on close, body scroll-lock, `role="dialog" aria-modal="true"`, `aria-labelledby` wired to DrawerHeader's title via DrawerContext `titleId`.

Keep-in-DOM approach: panel is always rendered, toggled via `translate-x-full / translate-x-0` + `pointer-events-none`. `motion-reduce:transition-none` respects prefers-reduced-motion.

DrawerContext (`DrawerContext.tsx`) provides `{ onClose, titleId }` to subcomponents — mirrors [[PageActionsContext]] pattern.

Icons use lucide-react directly (not a custom Icon abstraction).

## Form primitives (`src/components/form/`)

**FormField.tsx** — `label`, `required?`, `htmlFor?`, `helperText?`, `error?`, `children`. Auto-generates an id via `useId()`. The caller passes a matching `id` to their `<Input>` or `<Select>` using the `htmlFor` prop override or by reading `data-field-id` from the root element. Error uses `role="alert"`.

**Input.tsx** — Extends `Omit<ComponentPropsWithoutRef<'input'>, 'prefix'>` (native `prefix` attr is a string, ours is ReactNode — must Omit). `prefix?` renders inside the border. `h-11 rounded-lg border-neutral-400 focus:outline-primary-500`.

**Select.tsx** — Native `<select>` styled to match. `options?: {label, value}[]` OR `children` options. `placeholder` renders a disabled first option. ChevronDown icon positioned absolutely. Native select chosen for a11y (keyboard nav + screen reader announcements for free).

**ImageDropzone.tsx** — `<label>` wrapping a `sr-only` file input = entire area is clickable + keyboard accessible. `onFileSelect?(file: File)`, `label?`, `hint?`. Shows selected filename after pick. Dashed border `border-dashed border-neutral-400 rounded-lg`.

## AddProductDrawer (`src/app/(dashboard)/products/_components/AddProductDrawer.tsx`)

Page-level composition, no story. `open`, `onClose`, `onSubmit?(data: AddProductFormData)?`. Wraps Body+Footer in `<form onSubmit>` so Enter submits. Categories derived from `SAMPLE_PRODUCTS` (Coffee, Soup, Tea). Uses Switch (controlled, `checked` + `onChange`), Button `variant="primary-filled"` for Create Product.

## ProductPreviewDrawer (`src/app/(dashboard)/products/_components/ProductPreviewDrawer.tsx`)

Read-only product detail drawer. Props: `product: Product | null`, `open`, `onClose`, `onEdit?`, `onDelete?`. No footer. Composed from DrawerWrapper + DrawerHeader + DrawerBody only.

Header title pattern: passes a `<span>` (flex-col) as DrawerHeader's `title` ReactNode — outer span contains an aria-hidden eyebrow (`text-xs text-primary-500 "Product #N"`) and a visible name span (`text-base font-medium text-black`). The eyebrow is `aria-hidden="true"`, so `aria-labelledby` resolves cleanly to the product name only.

DrawerHeader was NOT changed — `title: ReactNode` already accepts compound nodes. AddProductDrawer is unaffected.

Body sections: Details header + Edit button (ghost `<button>` inline, `SquarePen` icon, primary-500), neutral-200 info card (label/value rows for Name/Stock/Price/Category/Status), divider, Delete section (`TriangleAlert` icon, danger Button full-width with `w-full justify-center`).

Status badge: `variant="success"` "Active" when `product.active`, `variant="neutral"` "Inactive" otherwise.

## Button `danger` variant

`danger` variant already existed: `bg-red-100 text-red-500`. Added hover: `hover:bg-red-200`. `danger-filled` also got `hover:bg-red-600`. Button.stories.tsx: added `DeleteProduct` story (danger + Trash2 + `w-full justify-center`).

## ProductsTable row-click pattern

Added optional `onProductSelect?(product: Product)` prop. When provided:
- `<tr>` gets `onClick={() => onProductSelect(product)}` + `cursor-pointer hover:bg-primary-100`
- Product name renders as `<button>` (keyboard-focusable, Enter/Space activates, stopPropagation so no double-fire)
- Toggle cell (`<td>`) and Action cell (`<td>`) both call `e.stopPropagation()` so they don't trigger row select

When `onProductSelect` is not provided, renders exactly as before (no `<button>` wrapper on name, no cursor/hover).

## Products page wiring

`src/app/(dashboard)/products/page.tsx` — `const [addOpen, setAddOpen] = useState(false)` + `const [selected, setSelected] = useState<Product | null>(null)`. `onProductSelect={setSelected}` on ProductsTable. `<ProductPreviewDrawer product={selected} open={selected !== null} onClose={() => setSelected(null)} />` coexists with AddProductDrawer. useMemo deps stay `[]`.
