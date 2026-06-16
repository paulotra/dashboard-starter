'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Download, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { NavActions } from '@/components/layout/PageActionsContext'
import OrdersTable from './_components/OrdersTable'

export default function OrdersPage() {
  const router = useRouter()

  // Memoize so NavActions receives a stable reference between re-renders.
  // router is stable across renders — safe to omit from deps.
  const actions = useMemo(
    () => (
      <>
        <Button variant="secondary" icon={Download} onClick={() => console.log('export')}>
          Export
        </Button>
        <Button variant="primary" icon={Plus} onClick={() => router.push('/orders/create')}>
          Create Order
        </Button>
      </>
    ),
    [router]
  )

  return (
    <>
      <NavActions>{actions}</NavActions>

      <div className="flex flex-col gap-3">
        <OrdersTable />
      </div>
    </>
  )
}
