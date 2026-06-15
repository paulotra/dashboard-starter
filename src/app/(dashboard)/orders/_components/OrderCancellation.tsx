'use client'

import { useState } from 'react'
import { TriangleAlert, Ban } from 'lucide-react'
import { cn } from '@/lib/utils'
import CardWrapper from '@/components/ui/CardWrapper'
import Button from '@/components/ui/Button'
import { ConfirmModal } from '@/components/ui/modal'

export interface OrderCancellationProps {
  orderNumber: string
  onCancel?: () => void
  className?: string
}

export default function OrderCancellation({
  orderNumber,
  onCancel,
  className,
}: OrderCancellationProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <CardWrapper className={cn('flex flex-col gap-4 px-4 pt-4 pb-3', className)}>
      <div className="flex items-center gap-2">
        <TriangleAlert aria-hidden="true" size={18} className="shrink-0 text-red-500" />
        <span className="font-sans text-sm font-medium text-black">Order Cancellation</span>
      </div>

      <p className="font-sans text-xs font-normal leading-5 text-neutral-600">
        Cancelling this order is permanent and cannot be undone. The customer will be notified that
        their order has been cancelled.
      </p>

      <Button
        variant="danger"
        icon={Ban}
        type="button"
        onClick={() => setConfirmOpen(true)}
        className="w-full justify-center"
      >
        Cancel Order
      </Button>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          onCancel?.()
        }}
        title="Cancel Order?"
        description={
          <>
            This action cannot be undone.{' '}
            <span className="font-medium text-black">Order {orderNumber}</span> will be cancelled and
            the customer notified.
          </>
        }
        confirmLabel="Cancel Order"
        cancelLabel="Keep Order"
      />
    </CardWrapper>
  )
}
