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

## Products page wiring

`src/app/(dashboard)/products/page.tsx` — added `const [addOpen, setAddOpen] = useState(false)`. Add Product NavAction onClick → `() => setAddOpen(true)`. `<AddProductDrawer open={addOpen} onClose={() => setAddOpen(false)} />` rendered alongside ProductsTable. useMemo deps stay `[]` (setAddOpen is a stable React setter).
