'use client'

import { useState } from 'react'
import type { Machine } from '@/lib/machines'
import { DrawerWrapper } from '@/components/ui/drawer'
import MachinePreviewContent from './MachinePreviewContent'
import MachineEditContent from './MachineEditContent'
import type { MachineFieldValues } from './MachineFormFields'

export interface MachinePreviewDrawerProps {
  machine: Machine | null
  open: boolean
  onClose: () => void
  onEdit?: () => void
  onLogMaintenance?: () => void
  onDelete?: () => void
  onSave?: (data: MachineFieldValues) => void
}

export default function MachinePreviewDrawer({
  machine,
  open,
  onClose,
  onEdit,
  onLogMaintenance,
  onDelete,
  onSave,
}: MachinePreviewDrawerProps) {
  const [mode, setMode] = useState<'view' | 'edit'>('view')

  // Guard-in-render reset: reset to view mode whenever the drawer opens or the
  // machine changes — React's recommended "reset state on prop change" pattern.
  const [prevMachineId, setPrevMachineId] = useState<string | undefined>(machine?.id)
  const [prevOpen, setPrevOpen] = useState<boolean>(open)

  if (prevMachineId !== machine?.id || prevOpen !== open) {
    setPrevMachineId(machine?.id)
    setPrevOpen(open)
    setMode('view')
  }

  return (
    <DrawerWrapper open={open} onClose={onClose}>
      {machine &&
        (mode === 'view' ? (
          <MachinePreviewContent
            machine={machine}
            onEdit={() => {
              onEdit?.()
              setMode('edit')
            }}
            onLogMaintenance={onLogMaintenance}
            onDelete={onDelete}
          />
        ) : (
          <MachineEditContent
            machine={machine}
            onCancel={() => setMode('view')}
            onSave={(data) => {
              onSave?.(data)
              setMode('view')
            }}
          />
        ))}
    </DrawerWrapper>
  )
}
