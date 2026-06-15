import type { ReactNode } from 'react'
import { SquarePen, TriangleAlert, Trash2 } from 'lucide-react'
import type { Product } from '@/lib/products'
import { DrawerHeader, DrawerBody } from '@/components/ui/drawer'
import Button from '@/components/ui/Button'
import BadgeStatus from '@/components/ui/BadgeStatus'

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

export interface ProductPreviewContentProps {
  product: Product
  /** Switch the drawer into edit mode. */
  onEdit: () => void
  onDelete?: () => void
}

export default function ProductPreviewContent({
  product,
  onEdit,
  onDelete,
}: ProductPreviewContentProps) {
  const title: ReactNode = (
    <span className="flex flex-col gap-0.5">
      <span className="font-sans text-xs font-normal text-primary-500" aria-hidden="true">
        Product #{product.id}
      </span>
      <span className="font-sans text-base font-medium text-black">{product.name}</span>
    </span>
  )

  return (
    <>
      <DrawerHeader title={title} />

      <DrawerBody>
        <div className="flex flex-col gap-5">
          {/* ── 1. Details section header ── */}
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm font-medium text-black">Details</span>
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex cursor-pointer items-center gap-1 text-primary-500 focus-visible:outline-2 focus-visible:outline-primary-500"
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
            <div className="flex items-center gap-2">
              <TriangleAlert aria-hidden="true" size={18} className="shrink-0 text-red-500" />
              <span className="font-sans text-sm font-medium text-black">Delete Product</span>
            </div>

            <p className="font-sans text-sm font-normal leading-relaxed text-neutral-600">
              Deleting a product will permanently remove it and its history.
            </p>

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
    </>
  )
}
