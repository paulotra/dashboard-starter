'use client'

import { useState } from 'react'
import type { Product } from '@/lib/products'
import { DrawerWrapper } from '@/components/ui/drawer'
import ProductPreviewContent from './ProductPreviewContent'
import ProductEditContent from './ProductEditContent'
import type { ProductFieldValues } from './ProductFormFields'

export interface ProductPreviewDrawerProps {
  product: Product | null
  open: boolean
  onClose: () => void
  onEdit?: () => void
  onDelete?: () => void
  onSave?: (data: ProductFieldValues) => void
}

export default function ProductPreviewDrawer({
  product,
  open,
  onClose,
  onEdit,
  onDelete,
  onSave,
}: ProductPreviewDrawerProps) {
  const [mode, setMode] = useState<'view' | 'edit'>('view')

  // Guard-in-render reset: store the last-seen identity in state so we can
  // compare during render and reset to view mode synchronously — the pattern
  // React recommends for "reset state when a prop changes" without an effect.
  // See: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevProductId, setPrevProductId] = useState<string | undefined>(product?.id)
  const [prevOpen, setPrevOpen] = useState<boolean>(open)

  if (prevProductId !== product?.id || prevOpen !== open) {
    setPrevProductId(product?.id)
    setPrevOpen(open)
    setMode('view')
  }

  return (
    <DrawerWrapper open={open} onClose={onClose}>
      {product &&
        (mode === 'view' ? (
          <ProductPreviewContent
            product={product}
            onEdit={() => {
              onEdit?.()
              setMode('edit')
            }}
            onDelete={onDelete}
          />
        ) : (
          <ProductEditContent
            product={product}
            onCancel={() => setMode('view')}
            onSave={(data) => {
              onSave?.(data)
              setMode('view')
            }}
          />
        ))}
    </DrawerWrapper>
  )
}
