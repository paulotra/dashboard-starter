'use client'

import type { Machine } from '@/lib/machines'
import { DrawerWrapper } from '@/components/ui/drawer'
import MachinePreviewContent from './MachinePreviewContent'

export interface MachinePreviewDrawerProps {
  machine: Machine | null
  open: boolean
  onClose: () => void
  onEdit?: () => void
  onLogMaintenance?: () => void
  onDelete?: () => void
}

export default function MachinePreviewDrawer({
  machine,
  open,
  onClose,
  onEdit,
  onLogMaintenance,
  onDelete,
}: MachinePreviewDrawerProps) {
  return (
    <DrawerWrapper open={open} onClose={onClose}>
      {machine && (
        <MachinePreviewContent
          machine={machine}
          onEdit={onEdit ?? (() => {})}
          onLogMaintenance={onLogMaintenance}
          onDelete={onDelete}
        />
      )}
    </DrawerWrapper>
  )
}
