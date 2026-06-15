'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { DrawerWrapper, DrawerHeader, DrawerBody, DrawerFooter } from '@/components/ui/drawer'
import Button from '@/components/ui/Button'
import ImageDropzone from '@/components/form/ImageDropzone'
import ProductFormFields from './ProductFormFields'
import type { ProductFieldValues } from './ProductFormFields'

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

/* ─── Initial state ─────────────────────────────────────────────────── */

const EMPTY_FIELDS: ProductFieldValues = {
  name: '',
  active: true,
  stock: '',
  price: '',
  category: '',
}

/* ─── Component ─────────────────────────────────────────────────────── */

export default function AddProductDrawer({
  open,
  onClose,
  onSubmit,
}: AddProductDrawerProps) {
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [fields, setFields] = useState<ProductFieldValues>(EMPTY_FIELDS)

  function handleChange(patch: Partial<ProductFieldValues>) {
    setFields((prev) => ({ ...prev, ...patch }))
  }

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    onSubmit?.({
      thumbnail,
      productName: fields.name,
      active: fields.active,
      stock: fields.stock,
      price: fields.price,
      category: fields.category,
    })
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

            {/* 2–6. Shared field set */}
            <ProductFormFields values={fields} onChange={handleChange} />
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
