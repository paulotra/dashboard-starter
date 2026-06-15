'use client'

import { useRef, useState, type ReactNode } from 'react'
import { Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import type { Machine } from '@/lib/machines'
import { DrawerHeader, DrawerBody, DrawerFooter } from '@/components/ui/drawer'
import Button from '@/components/ui/Button'
import MachineFormFields from './MachineFormFields'
import type { MachineFieldValues } from './MachineFormFields'

/* ─── Seed helper ───────────────────────────────────────────────────── */

function seedFields(machine: Machine): MachineFieldValues {
  return {
    name: machine.name,
    active: machine.active,
    serialNumber: machine.serialNumber,
    category: machine.category,
    // The form's "Location" maps to the machine's stored address.
    location: machine.address,
  }
}

/* ─── Component ─────────────────────────────────────────────────────── */

export interface MachineEditContentProps {
  machine: Machine
  /** Return to view mode (back button + Cancel). */
  onCancel: () => void
  onSave?: (data: MachineFieldValues) => void
}

export default function MachineEditContent({ machine, onCancel, onSave }: MachineEditContentProps) {
  // Seeded once on mount — this component only mounts while in edit mode, so
  // re-entering edit (after returning to view) re-seeds from the current machine.
  const [values, setValues] = useState<MachineFieldValues>(() => seedFields(machine))
  const [localImage, setLocalImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setLocalImage(URL.createObjectURL(file))
    e.target.value = ''
  }

  function handleRemoveImage() {
    if (localImage) {
      URL.revokeObjectURL(localImage)
    }
    setLocalImage(null)
  }

  const title: ReactNode = (
    <span className="flex flex-col gap-0.5">
      <span className="text-primary-500 font-sans text-xs font-normal" aria-hidden="true">
        Machine #{machine.id}
      </span>
      <span className="font-sans text-base font-medium text-black">Edit Machine</span>
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
            {/* ── Thumbnail section ── */}
            <div className="flex flex-col gap-1.5">
              <span className="font-sans text-sm font-medium text-black">Thumbnail</span>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                aria-label="Replace machine image"
                onChange={handleFileChange}
              />

              {/* Image banner with overlay buttons */}
              <div className="relative h-52 w-full overflow-hidden rounded-xl">
                <Image
                  src={localImage ?? machine.image}
                  alt={machine.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 512px"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30">
                  <Button
                    variant="secondary"
                    icon={Upload}
                    type="button"
                    className="border-0 py-2"
                    iconClassName="text-primary-500"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Replace
                  </Button>
                  <Button
                    variant="secondary"
                    icon={Trash2}
                    type="button"
                    className="border-0 py-2"
                    iconClassName="text-primary-500"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            {/* ── Divider ── */}
            <hr className="border-neutral-400" />

            {/* ── Form fields ── */}
            <MachineFormFields
              values={values}
              onChange={(patch) => setValues((v) => ({ ...v, ...patch }))}
            />
          </div>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary-filled" type="submit">
            Save Changes
          </Button>
        </DrawerFooter>
      </form>
    </>
  )
}
