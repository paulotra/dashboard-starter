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

## DrawerHeader (`src/components/ui/drawer/DrawerHeader.tsx`)

Added optional `onBack?: () => void` prop (2026-06-15). When provided, renders a `size-9 bg-neutral-200 rounded-lg` button with `ChevronLeft` (size 18) before the title. Title and close button wrapped in `justify-between` flex row; title wrapped in `min-w-0 items-center gap-2` flex div. Fully backward-compatible — omitting `onBack` renders exactly as before.

## ProductPreviewDrawer (`src/app/(dashboard)/products/_components/ProductPreviewDrawer.tsx`)

Now has `mode: 'view' | 'edit'` state (default `'view'`). Props: `product`, `open`, `onClose`, `onEdit?`, `onDelete?`, `onSave?(data: ProductFieldValues)`.

**Reset pattern:** Uses guarded render-phase `setState` (React's documented "adjust state when prop changes" approach) — stores `prevProductId` and `prevOpen` in state (not refs), compares during render, and calls `setMode/setLocalImage/setEditValues` synchronously when identity changes. This avoids both `setState`-in-effect (blocked by linter) and ref reads during render (also blocked by linter).

**View mode:** Unchanged preview content. "Edit product" button now calls `onEdit?.()` then `setMode('edit')`.

**Edit mode:**
- Header: `<DrawerHeader onBack={() => setMode('view')}>` with eyebrow "Product #N" + "Edit {name}" title node.
- Body: Thumbnail section — `next/image` with `fill` + `object-cover` + `rounded-xl` inside `relative h-52 w-full overflow-hidden` container. Overlay `bg-black/30` with Replace (Upload icon) + Remove (Trash2 icon) secondary Buttons. Hidden `<input type="file" accept="image/*" className="sr-only">` triggered via `fileInputRef.current?.click()`. Local image stored as object URL; revoked on remove. Falls back to `product.image` when no local image.
- Body: `<hr className="border-neutral-400">` divider then `<ProductFormFields>`.
- Seeding: `price` strips leading non-digit chars (`product.price.replace(/^[^\d]+/, '')`).
- Footer: Cancel (secondary, `setMode('view')`) + Save Changes (primary-filled, type="submit").
- Body+Footer wrapped in `<form onSubmit>` with `className="flex min-h-0 flex-1 flex-col"`.

Header title pattern: passes a `<span>` (flex-col) as DrawerHeader's `title` ReactNode — outer span contains an aria-hidden eyebrow (`text-xs text-primary-500 "Product #N"`) and a visible name span (`text-base font-medium text-black`). The eyebrow is `aria-hidden="true"`, so `aria-labelledby` resolves cleanly to the product name only.

DrawerHeader `title: ReactNode` already accepted compound nodes. AddProductDrawer is unaffected.

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
