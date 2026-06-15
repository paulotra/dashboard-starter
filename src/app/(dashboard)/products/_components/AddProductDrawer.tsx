'use client'

import { useState, useId, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import { SAMPLE_PRODUCTS } from '@/lib/products'
import { DrawerWrapper, DrawerHeader, DrawerBody, DrawerFooter } from '@/components/ui/drawer'
import Button from '@/components/ui/Button'
import Switch from '@/components/ui/Switch'
import FormField from '@/components/form/FormField'
import Input from '@/components/form/Input'
import Select from '@/components/form/Select'
import ImageDropzone from '@/components/form/ImageDropzone'

/* ─── Types ────────────────────────────────────────────────────────── */

export interface AddProductFormData {
  thumbnail: File | null
  productName: string
  active: boolean
  stock: string
  price: string
  category: string
}

export interface AddProductDrawerProps {
  open: boolean
  onClose: () => void
  onSubmit?: (data: AddProductFormData) => void
}

/* ─── Derive unique categories from sample data ─────────────────────── */

const CATEGORY_OPTIONS = Array.from(
  new Set(SAMPLE_PRODUCTS.map((p) => p.category))
)
  .sort()
  .map((cat) => ({ label: cat, value: cat }))

/* ─── Component ─────────────────────────────────────────────────────── */

export default function AddProductDrawer({
  open,
  onClose,
  onSubmit,
}: AddProductDrawerProps) {
  /* ── Form state ── */
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [productName, setProductName] = useState('')
  const [active, setActive] = useState(true)
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')

  /* ── Ids for explicit label association ── */
  const productNameId = useId()
  const stockId = useId()
  const priceId = useId()
  const categoryId = useId()
  const activeId = useId()

  /* ── Handlers ── */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit?.({ thumbnail, productName, active, stock, price, category })
    onClose()
  }

  function handleClose() {
    onClose()
  }

  return (
    <DrawerWrapper open={open} onClose={handleClose}>
      <DrawerHeader title="Add Product" />

      {/*
        Wrap Body + Footer in a single <form> so Enter submits
        and the primary button's type="submit" works correctly.
      */}
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <DrawerBody>
          <div className="flex flex-col gap-5">
            {/* 1. Thumbnail */}
            <div className="flex flex-col gap-1.5">
              <span className="font-sans text-sm font-medium text-black">Thumbnail</span>
              <ImageDropzone
                label="Upload image"
                hint="PNG, JPG up to 5MB"
                onFileSelect={(file) => setThumbnail(file)}
              />
            </div>

            {/* Divider */}
            <hr className="border-neutral-400" />

            {/* 2. Product Name */}
            <FormField label="Product Name" required htmlFor={productNameId}>
              <Input
                id={productNameId}
                type="text"
                placeholder="e.g. Cappuccino"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </FormField>

            {/* 3. Active toggle row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <label
                  htmlFor={activeId}
                  className="font-sans text-sm font-medium text-black"
                >
                  Active
                </label>
                <p id={`${activeId}-desc`} className="font-sans text-sm text-neutral-600">
                  Product is available for purchase
                </p>
              </div>
              <Switch
                checked={active}
                onChange={setActive}
                aria-label="Active"
              />
            </div>

            {/* 4. Stock */}
            <FormField label="Stock" required htmlFor={stockId}>
              <Input
                id={stockId}
                type="number"
                placeholder="0"
                min={0}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </FormField>

            {/* 5. Price */}
            <FormField label="Price" required htmlFor={priceId}>
              <Input
                id={priceId}
                type="number"
                prefix="€"
                placeholder="0.00"
                min={0}
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </FormField>

            {/* 6. Category */}
            <FormField label="Category" required htmlFor={categoryId}>
              <Select
                id={categoryId}
                placeholder="Select a category"
                options={CATEGORY_OPTIONS}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </FormField>
          </div>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="secondary" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary-filled" icon={Plus} type="submit">
            Create Product
          </Button>
        </DrawerFooter>
      </form>
    </DrawerWrapper>
  )
}
