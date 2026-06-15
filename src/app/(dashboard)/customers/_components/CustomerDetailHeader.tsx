'use client'

import { Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { NavHeader, NavActions } from '@/components/layout/PageActionsContext'

export interface CustomerDetailHeaderProps {
  customerName: string
  pendingOrders: number
}

/**
 * Drives the Navigation header for a customer detail page: overrides the title
 * + breadcrumb and injects the page-level action buttons. Renders nothing
 * itself.
 */
export default function CustomerDetailHeader({
  customerName,
  pendingOrders,
}: CustomerDetailHeaderProps) {
  return (
    <>
      <NavHeader
        title={customerName}
        breadcrumb={[
          { label: 'Manage' },
          { label: 'Customers', href: '/customers' },
          { label: customerName },
        ]}
      />
      <NavActions>
        {pendingOrders > 0 && (
          <span className="bg-yellow-100 text-yellow-600 inline-flex items-center gap-2 rounded-lg px-5 py-3 font-sans text-sm font-medium whitespace-nowrap">
            <span aria-hidden="true" className="bg-yellow-600 size-1.5 shrink-0 rounded-full" />
            {pendingOrders} Pending {pendingOrders === 1 ? 'Order' : 'Orders'}
          </span>
        )}
        <Button variant="primary" icon={Plus} onClick={() => console.log('create order')}>
          Create Order
        </Button>
      </NavActions>
    </>
  )
}
