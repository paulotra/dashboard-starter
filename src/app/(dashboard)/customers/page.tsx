'use client'

import { useMemo, useState } from 'react'
import { Download, UserPlus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { NavActions } from '@/components/layout/PageActionsContext'
import CustomersTable from './_components/CustomersTable'
import InviteCustomerModal from './_components/InviteCustomerModal'

export default function CustomersPage() {
  const [inviteOpen, setInviteOpen] = useState(false)

  // Memoize so NavActions receives a stable reference between re-renders.
  // setInviteOpen is a stable React setter — safe to omit from deps.
  const actions = useMemo(
    () => (
      <>
        <Button variant="secondary" icon={Download} onClick={() => console.log('export')}>
          Export
        </Button>
        <Button variant="primary" icon={UserPlus} onClick={() => setInviteOpen(true)}>
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

      <InviteCustomerModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onInvite={(email) => console.log('invite customer', email)}
      />
    </>
  )
}
