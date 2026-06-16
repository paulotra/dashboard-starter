'use client'

import { NavHeader } from '@/components/layout/PageActionsContext'

/**
 * Drives the Navigation header for the create-order page: overrides the title +
 * breadcrumb. No page-level actions (the primary action lives in the form).
 */
export default function CreateOrderHeader() {
  return (
    <NavHeader
      title="Create Order"
      breadcrumb={[
        { label: 'Manage' },
        { label: 'Orders', href: '/orders' },
        { label: 'Create Order' },
      ]}
    />
  )
}
