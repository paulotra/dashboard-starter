'use client'

import { useState, type ReactNode } from 'react'
import { SquarePen, Wrench, TriangleAlert, Trash2 } from 'lucide-react'
import type { Machine } from '@/lib/machines'
import { DrawerHeader, DrawerBody } from '@/components/ui/drawer'
import { ConfirmModal } from '@/components/ui/modal'
import Button from '@/components/ui/Button'
import BadgeStatus from '@/components/ui/BadgeStatus'

/* ─── Label / value row ─────────────────────────────────────────────── */

interface InfoRowProps {
  label: string
  children: ReactNode
}

function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-sans text-xs font-normal text-neutral-600">{label}</span>
      <span className="font-sans text-xs font-normal text-black">{children}</span>
    </div>
  )
}

/* ─── Component ─────────────────────────────────────────────────────── */

export interface MachinePreviewContentProps {
  machine: Machine
  onEdit: () => void
  onLogMaintenance?: () => void
  onDelete?: () => void
}

export default function MachinePreviewContent({
  machine,
  onEdit,
  onLogMaintenance,
  onDelete,
}: MachinePreviewContentProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const title: ReactNode = (
    <span className="flex flex-col gap-0.5">
      <span className="font-sans text-xs font-normal text-primary-500" aria-hidden="true">
        Machine #{machine.id}
      </span>
      <span className="font-sans text-base font-medium text-black">{machine.name}</span>
    </span>
  )

  return (
    <>
      <DrawerHeader title={title} />

      <DrawerBody>
        <div className="flex flex-col gap-5">
          {/* ── 1. Details section header ── */}
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm font-medium text-black">Details</span>
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex cursor-pointer items-center gap-1 text-primary-500 focus-visible:outline-2 focus-visible:outline-primary-500"
              aria-label="Edit machine"
            >
              <SquarePen aria-hidden="true" size={14} />
              <span className="font-sans text-xs font-normal">Edit machine</span>
            </button>
          </div>

          {/* ── 2. Machine info card ── */}
          <div className="flex flex-col gap-3 rounded-xl bg-neutral-200 p-4">
            <InfoRow label="Name">{machine.name}</InfoRow>
            <InfoRow label="Serial number">{machine.serialNumber}</InfoRow>
            <InfoRow label="Category">{machine.category}</InfoRow>
            <InfoRow label="Address">{machine.address}</InfoRow>
            <InfoRow label="Status">
              <BadgeStatus variant={machine.active ? 'success' : 'neutral'}>
                {machine.active ? 'Active' : 'Inactive'}
              </BadgeStatus>
            </InfoRow>
          </div>

          {/* ── 3. Divider ── */}
          <hr className="border-neutral-400" />

          {/* ── 4. Maintenance history section ── */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-sm font-medium text-black">Maintenance history</span>
              <button
                type="button"
                onClick={onLogMaintenance}
                className="inline-flex cursor-pointer items-center gap-1 text-primary-500 focus-visible:outline-2 focus-visible:outline-primary-500"
                aria-label="Log maintenance"
              >
                <Wrench aria-hidden="true" size={14} />
                <span className="font-sans text-xs font-normal">Log maintenance</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {machine.maintenanceHistory.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-neutral-200 px-4 py-2"
                >
                  <span className="font-sans text-xs text-primary-500">{entry.date}</span>
                  <span className="font-sans text-xs text-black">{entry.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 5. Divider ── */}
          <hr className="border-neutral-400" />

          {/* ── 6. Delete section ── */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <TriangleAlert aria-hidden="true" size={18} className="shrink-0 text-red-500" />
              <span className="font-sans text-sm font-medium text-black">Delete Machine</span>
            </div>

            <p className="font-sans text-sm font-normal leading-relaxed text-neutral-600">
              Deleting a machine will permanently delete this machine and its maintenance history.
            </p>

            <Button
              variant="danger"
              icon={Trash2}
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="w-full justify-center"
            >
              Delete Machine
            </Button>
          </div>
        </div>
      </DrawerBody>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          onDelete?.()
        }}
        title="Delete Machine?"
        description={
          <>
            This action cannot be undone. The{' '}
            <span className="font-medium text-black">Machine #{machine.id}</span> and all its
            maintenance history will be permanently deleted.
          </>
        }
        confirmLabel="Delete Machine"
      />
    </>
  )
}
