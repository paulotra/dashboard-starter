'use client'

import { useState, useMemo } from 'react'
import { Download, Plus } from 'lucide-react'
import type { Machine } from '@/lib/machines'
import Button from '@/components/ui/Button'
import { NavActions } from '@/components/layout/PageActionsContext'
import MachinesTable from './_components/MachinesTable'
import AddMachineDrawer from './_components/AddMachineDrawer'
import MachinePreviewDrawer from './_components/MachinePreviewDrawer'

export default function MachinesPage() {
  const [addOpen, setAddOpen] = useState(false)
  const [selected, setSelected] = useState<Machine | null>(null)

  // Memoize so NavActions receives a stable reference between re-renders.
  // setAddOpen is stable (React guarantees setState setters never change),
  // so the deps array can safely stay [].
  const actions = useMemo(
    () => (
      <>
        <Button variant="secondary" icon={Download} onClick={() => console.log('export')}>
          Export
        </Button>
        <Button variant="primary" icon={Plus} onClick={() => setAddOpen(true)}>
          Add Machine
        </Button>
      </>
    ),
    [] // setAddOpen is a stable React setter — safe to omit from deps
  )

  return (
    <>
      <NavActions>{actions}</NavActions>

      <div className="flex flex-col gap-3">
        <MachinesTable onMachineSelect={setSelected} />
      </div>

      <AddMachineDrawer open={addOpen} onClose={() => setAddOpen(false)} />
      <MachinePreviewDrawer
        machine={selected}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </>
  )
}
