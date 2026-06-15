'use client'

import { useMemo } from 'react'
import { Download, UserPlus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { NavActions } from '@/components/layout/PageActionsContext'
import CustomersTable from './_components/CustomersTable'

export default function CustomersPage() {
  // Memoize so NavActions receives a stable reference between re-renders
  const actions = useMemo(
    () => (
      <>
        <Button variant="secondary" icon={Download} onClick={() => console.log('export')}>
          Export
        </Button>
        <Button variant="primary" icon={UserPlus} onClick={() => console.log('invite customer')}>
          Invite Customer
        </Button>
      </>
    ),
    []
  )

  return (
    <>
      <NavActions>{actions}</NavActions>

      <div className="flex flex-col gap-3">
        <CustomersTable />
      </div>
    </>
  )
}
