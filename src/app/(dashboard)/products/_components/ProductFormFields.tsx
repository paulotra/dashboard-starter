'use client'

import { useId } from 'react'
import { SAMPLE_PRODUCTS } from '@/lib/products'
import Switch from '@/components/ui/Switch'
import FormField from '@/components/form/FormField'
import Input from '@/components/form/Input'
import Select from '@/components/form/Select'

/* ─── Types ────────────────────────────────────────────────────────── */

export interface ProductFieldValues {
  name: string
  active: boolean
  stock: string
  price: string
  category: string
}

export interface ProductFormFieldsProps {
  values: ProductFieldValues
  onChange: (patch: Partial<ProductFieldValues>) => void
}

/* ─── Derive unique categories once (module-level, no re-computation) ── */

const CATEGORY_OPTIONS = Array.from(new Set(SAMPLE_PRODUCTS.map((p) => p.category)))
  .sort()
  .map((cat) => ({ label: cat, value: cat }))

/* ─── Component ─────────────────────────────────────────────────────── */

/**
 * Shared controlled field set used by both AddProductDrawer and the Edit mode
 * inside ProductPreviewDrawer. Renders:
 *   1. Product Name (text, required)
 *   2. Active toggle row (Switch + description)
 *   3. Stock (number, required)
 *   4. Price (number, required, € prefix)
 *   5. Category (Select, required)
 *
 * Does NOT include the thumbnail — that differs between Add and Edit.
 */
export default function ProductFormFields({ values, onChange }: ProductFormFieldsProps) {
  const productNameId = useId()
  const activeId = useId()
  const stockId = useId()
  const priceId = useId()
  const categoryId = useId()

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Product Name */}
      <FormField label="Product Name" required htmlFor={productNameId}>
        <Input
          id={productNameId}
          type="text"
          placeholder="e.g. Cappuccino"
          value={values.name}
          onChange={(e) => onChange({ name: e.target.value })}
          required
        />
      </FormField>

      {/* 2. Active toggle row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <label htmlFor={activeId} className="font-sans text-sm font-medium text-black">
            Active
          </label>
          <p id={`${activeId}-desc`} className="font-sans text-sm text-neutral-600">
            Product is available for purchase
          </p>
        </div>
        <Switch
          checked={values.active}
          onChange={(checked) => onChange({ active: checked })}
          aria-label="Active"
        />
      </div>

      {/* 3. Stock */}
      <FormField label="Stock" required htmlFor={stockId}>
        <Input
          id={stockId}
          type="number"
          placeholder="0"
          min={0}
          value={values.stock}
          onChange={(e) => onChange({ stock: e.target.value })}
          required
        />
      </FormField>

      {/* 4. Price */}
      <FormField label="Price" required htmlFor={priceId}>
        <Input
          id={priceId}
          type="number"
          prefix="€"
          placeholder="0.00"
          min={0}
          step="0.01"
          value={values.price}
          onChange={(e) => onChange({ price: e.target.value })}
          required
        />
      </FormField>

      {/* 5. Category */}
      <FormField label="Category" required htmlFor={categoryId}>
        <Select
          id={categoryId}
          placeholder="Select a category"
          options={CATEGORY_OPTIONS}
          value={values.category}
          onChange={(e) => onChange({ category: e.target.value })}
          required
        />
      </FormField>
    </div>
  )
}
