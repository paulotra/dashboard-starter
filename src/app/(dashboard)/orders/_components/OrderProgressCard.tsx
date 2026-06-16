'use client'

import { useState } from 'react'
import OrderProgress, { type OrderStatus } from '@/components/ui/OrderProgress'

export interface OrderProgressCardProps {
  initialStatus: OrderStatus
}

/**
 * Client wrapper that holds the order's pipeline status so the steps and action
 * button in `OrderProgress` are interactive. No persistence — local state only.
 */
export default function OrderProgressCard({ initialStatus }: OrderProgressCardProps) {
  const [status, setStatus] = useState<OrderStatus>(initialStatus)
  return <OrderProgress status={status} onStatusChange={setStatus} />
}
