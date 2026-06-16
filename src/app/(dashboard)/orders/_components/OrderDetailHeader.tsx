'use client'

import { useRouter } from 'next/navigation'
import { SquarePen } from 'lucide-react'
import Button from '@/components/ui/Button'
import { NavHeader, NavActions } from '@/components/layout/PageActionsContext'

export interface OrderDetailHeaderProps {
  orderId: string
  orderNumber: string
}

/**
 * Drives the Navigation header for an order detail page: overrides the title +
 * breadcrumb and injects the "Edit Order" action. Renders nothing itself.
 */
export default function OrderDetailHeader({ orderId, orderNumber }: OrderDetailHeaderProps) {
  const router = useRouter()
  const title = `Order ${orderNumber}`

  return (
    <>
      <NavHeader
        title={title}
        breadcrumb={[
          { label: 'Manage' },
          { label: 'Orders', href: '/orders' },
          { label: title },
        ]}
      />
      <NavActions>
        <Button
          variant="primary"
          icon={SquarePen}
          onClick={() => router.push(`/orders/${orderId}/edit`)}
        >
          Edit Order
        </Button>
      </NavActions>
    </>
  )
}
