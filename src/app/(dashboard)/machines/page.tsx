'use client'

import { useMemo } from 'react'
import { Download, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { NavActions } from '@/components/layout/PageActionsContext'
import MachinesTable from './_components/MachinesTable'

export default function MachinesPage() {
  // Memoize so NavActions receives a stable reference between re-renders
  const actions = useMemo(
    () => (
      <>
        <Button variant="secondary" icon={Download} onClick={() => console.log('export')}>
          Export
        </Button>
        <Button variant="primary" icon={Plus} onClick={() => console.log('add machine')}>
          Add Machine
        </Button>
      </>
    ),
    []
  )

  return (
    <>
      <NavActions>{actions}</NavActions>

      <div className="flex flex-col gap-3">
        <MachinesTable />
      </div>
    </>
  )
}
