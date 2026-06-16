'use client'

import { NavHeader } from '@/components/layout/PageActionsContext'

export interface EditOrderHeaderProps {
  orderNumber: string
}

/**
 * Drives the Navigation header for the edit-order page: overrides the title +
 * breadcrumb. The primary action ("Update Order") lives in the form.
 */
export default function EditOrderHeader({ orderNumber }: EditOrderHeaderProps) {
  const title = `Edit Order ${orderNumber}`

  return (
    <NavHeader
      title={title}
      breadcrumb={[
        { label: 'Manage' },
        { label: 'Orders', href: '/orders' },
        { label: title },
      ]}
    />
  )
}
