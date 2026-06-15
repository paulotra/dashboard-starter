'use client'

import type { ReactNode } from 'react'
import { SquarePen, TriangleAlert, Trash2 } from 'lucide-react'
import type { Product } from '@/lib/products'
import { DrawerWrapper, DrawerHeader, DrawerBody } from '@/components/ui/drawer'
import Button from '@/components/ui/Button'
import BadgeStatus from '@/components/ui/BadgeStatus'

/* ─── Types ────────────────────────────────────────────────────────── */

export interface ProductPreviewDrawerProps {
  product: Product | null
  open: boolean
  onClose: () => void
  onEdit?: () => void
  onDelete?: () => void
}

/* ─── Label / value row ─────────────────────────────────────────────── */

interface InfoRowProps {
  label: string
  children: ReactNode
}

function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-sans text-xs font-normal text-neutral-600">{label}</span>
      <span className="font-sans text-xs font-normal text-black">{children}</span>
    </div>
  )
}

/* ─── Component ─────────────────────────────────────────────────────── */

export default function ProductPreviewDrawer({
  product,
  open,
  onClose,
  onEdit,
  onDelete,
}: ProductPreviewDrawerProps) {
  /*
    DrawerHeader.title is typed as ReactNode, so we can pass a compound node
    with the eyebrow above the product name. DrawerHeader wraps it in
    <h2 id={titleId}>, so the dialog's aria-labelledby resolves to the <h2>
    whose text content is "Product #N  {name}" — a clear, meaningful label.

    AddProductDrawer passes a plain string and is unaffected.
  */
  const headerTitle: ReactNode = product ? (
    <span className="flex flex-col gap-0.5">
      <span className="text-primary-500 font-sans text-xs font-normal" aria-hidden="true">
        Product #{product.id}
      </span>
      <span className="font-sans text-base font-medium text-black">{product.name}</span>
    </span>
  ) : (
    'Product'
  )

  return (
    <DrawerWrapper open={open} onClose={onClose}>
      <DrawerHeader title={headerTitle} />

      {product && (
        <DrawerBody>
          <div className="flex flex-col gap-5">
            {/* ── 1. Details section header ── */}
            <div className="flex items-center justify-between">
              <span className="font-sans text-sm font-medium text-black">Details</span>
              <button
                type="button"
                onClick={onEdit}
                className="text-primary-500 focus-visible:outline-primary-500 inline-flex cursor-pointer items-center gap-1 focus-visible:outline-2"
                aria-label="Edit product"
              >
                <SquarePen aria-hidden="true" size={14} />
                <span className="font-sans text-xs font-normal">Edit product</span>
              </button>
            </div>

            {/* ── 2. Product info card ── */}
            <div className="flex flex-col gap-3 rounded-xl bg-neutral-200 p-4">
              <InfoRow label="Name">{product.name}</InfoRow>
              <InfoRow label="Stock">{product.stock}</InfoRow>
              <InfoRow label="Price">{product.price}</InfoRow>
              <InfoRow label="Category">{product.category}</InfoRow>
              <InfoRow label="Status">
                <BadgeStatus variant={product.active ? 'success' : 'neutral'}>
                  {product.active ? 'Active' : 'Inactive'}
                </BadgeStatus>
              </InfoRow>
            </div>

            {/* ── 3. Divider ── */}
            <hr className="border-neutral-400" />

            {/* ── 4. Delete section ── */}
            <div className="flex flex-col gap-3">
              {/* Section header */}
              <div className="flex items-center gap-2">
                <TriangleAlert aria-hidden="true" size={18} className="shrink-0 text-red-500" />
                <span className="font-sans text-sm font-medium text-black">Delete Product</span>
              </div>

              {/* Description */}
              <p className="font-sans text-sm leading-relaxed font-normal text-neutral-600">
                Deleting a product will permanently remove it and its history.
              </p>

              {/* Delete button — full width, danger variant */}
              <Button
                variant="danger"
                icon={Trash2}
                type="button"
                onClick={onDelete}
                className="w-full justify-center"
              >
                Delete Product
              </Button>
            </div>
          </div>
        </DrawerBody>
      )}
    </DrawerWrapper>
  )
}
