'use client'

import { useState } from 'react'
import type { Machine } from '@/lib/machines'
import { DrawerWrapper } from '@/components/ui/drawer'
import MachinePreviewContent from './MachinePreviewContent'
import MachineEditContent from './MachineEditContent'
import MachineLogHistoryContent from './MachineLogHistoryContent'
import type { MachineFieldValues } from './MachineFormFields'
import type { MachineLogValues } from './MachineLogHistoryContent'

export interface MachinePreviewDrawerProps {
  machine: Machine | null
  open: boolean
  onClose: () => void
  onEdit?: () => void
  onLogMaintenance?: () => void
  onDelete?: () => void
  onSave?: (data: MachineFieldValues) => void
  onLogSave?: (data: MachineLogValues) => void
}

export default function MachinePreviewDrawer({
  machine,
  open,
  onClose,
  onEdit,
  onLogMaintenance,
  onDelete,
  onSave,
  onLogSave,
}: MachinePreviewDrawerProps) {
  const [mode, setMode] = useState<'view' | 'edit' | 'log'>('view')

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
            onLogMaintenance={() => {
              onLogMaintenance?.()
              setMode('log')
            }}
            onDelete={onDelete}
          />
        ) : mode === 'edit' ? (
          <MachineEditContent
            machine={machine}
            onCancel={() => setMode('view')}
            onSave={(data) => {
              onSave?.(data)
              setMode('view')
            }}
          />
        ) : (
          <MachineLogHistoryContent
            machine={machine}
            onCancel={() => setMode('view')}
            onSave={(data) => {
              onLogSave?.(data)
              setMode('view')
            }}
          />
        ))}
    </DrawerWrapper>
  )
}
