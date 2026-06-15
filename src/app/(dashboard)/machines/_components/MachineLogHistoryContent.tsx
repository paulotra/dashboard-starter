'use client'

import { useId, useState, type ReactNode } from 'react'
import type { Machine } from '@/lib/machines'
import { DrawerHeader, DrawerBody, DrawerFooter } from '@/components/ui/drawer'
import Button from '@/components/ui/Button'
import FormField from '@/components/form/FormField'
import Input from '@/components/form/Input'

/* ─── Types ─────────────────────────────────────────────────────────── */

export interface MachineLogValues {
  date: string
  note: string
}

/* ─── Component ─────────────────────────────────────────────────────── */

export interface MachineLogHistoryContentProps {
  machine: Machine
  /** Return to view mode (back button + Cancel). */
  onCancel: () => void
  onSave?: (data: MachineLogValues) => void
}

export default function MachineLogHistoryContent({
  machine,
  onCancel,
  onSave,
}: MachineLogHistoryContentProps) {
  // Fresh entry each time — this component only mounts while in log mode, so
  // re-entering log (after returning to view) starts from an empty form.
  const [values, setValues] = useState<MachineLogValues>({ date: '', note: '' })

  const dateId = useId()
  const noteId = useId()

  const title: ReactNode = (
    <span className="flex flex-col gap-0.5">
      <span className="text-primary-500 font-sans text-xs font-normal" aria-hidden="true">
        Machine #{machine.id}
      </span>
      <span className="font-sans text-base font-medium text-black">Log Maintenance</span>
    </span>
  )

  return (
    <>
      <DrawerHeader title={title} onBack={onCancel} />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSave?.(values)
        }}
        className="flex min-h-0 flex-1 flex-col"
      >
        <DrawerBody>
          <div className="flex flex-col gap-5">
            {/* ── Date ── */}
            <FormField label="Date" required htmlFor={dateId}>
              <Input
                id={dateId}
                type="date"
                value={values.date}
                onChange={(e) => setValues((v) => ({ ...v, date: e.target.value }))}
                required
              />
            </FormField>

            {/* ── Note ── */}
            <FormField label="Note" required htmlFor={noteId}>
              <textarea
                id={noteId}
                rows={6}
                placeholder="e.g. Preventief onderhoud uitgevoerd"
                value={values.note}
                onChange={(e) => setValues((v) => ({ ...v, note: e.target.value }))}
                required
                className="focus:outline-primary-500 min-h-40 w-full resize-none rounded-lg border border-neutral-400 bg-white px-4 py-3 font-sans text-sm text-black placeholder:text-neutral-600 focus:outline-2"
              />
            </FormField>
          </div>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary-filled" type="submit">
            Log Maintenance
          </Button>
        </DrawerFooter>
      </form>
    </>
  )
}
