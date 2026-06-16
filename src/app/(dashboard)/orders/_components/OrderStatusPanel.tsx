'use client'

import { useState } from 'react'
import OrderProgress, { type OrderStatus } from '@/components/ui/OrderProgress'
import OrderDetailsCard, { type OrderSummary } from './OrderDetailsCard'
import OrderCancellation from './OrderCancellation'

export interface OrderStatusPanelProps {
  initialStatus: OrderStatus
  orderNumber: string
  orderDate: string
  quantity: string
  summary: OrderSummary
  notes?: string
}

/**
 * Owns the order's status so the details card, progress stepper, and the cancel
 * action all stay in sync. Advancing the pipeline (or cancelling) updates the
 * status badge in the details card and the progress bar together.
 */
export default function OrderStatusPanel({
  initialStatus,
  orderNumber,
  orderDate,
  quantity,
  summary,
  notes,
}: OrderStatusPanelProps) {
  const [status, setStatus] = useState<OrderStatus>(initialStatus)

  return (
    <>
      <OrderDetailsCard
        orderNumber={orderNumber}
        status={status}
        orderDate={orderDate}
        quantity={quantity}
        summary={summary}
        notes={notes}
      />
      <OrderProgress status={status} onStatusChange={setStatus} />
      <OrderCancellation orderNumber={orderNumber} onCancel={() => setStatus('Cancelled')} />
    </>
  )
}
